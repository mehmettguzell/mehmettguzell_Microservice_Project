# Frontend(Next.js)

## 1. Genel yapı

- Frontend **Next.js** ile geliştirilmiş ve **sayfa + component temelli bir mimari** kullanılmıştır.
- **Sayfalar**:
  - `/product` → Ürün yönetimi
  - `/inventory` → Stok yönetimi
  - `/order` → Sipariş yönetimi (cart)
- **Component yapısı**:
  - Her sayfa kendi **wrapper component**’ine sahip (`ProductBarWrapper`, `InventoryBarWrapper`, `OrderWrapper`).
  - Wrapper component’ler **veri alımı ve state yönetimi** sorumluluğunu taşır.
  - Wrapper içinde **listeleme ve CRUD component’leri** bulunur (`ProductCard`, `InventoryCard`, `OrderCard` vb.).
- **State yönetimi ve kullanıcı etkileşimi**:
  - React `useState`, `useEffect`, `useCallback` ile state yönetimi yapılır.
  - Kullanıcı aksiyonları (ekleme, silme, onaylama) **servisler aracılığıyla backend’e gönderilir** ve UI güncellenir.
  - `toast` ve loading göstergeleri ile kullanıcı deneyimi geliştirilir.
- **API iletişimi**:
  - Tüm HTTP istekleri `fetcher.ts` üzerinden yapılır.
  - API Gateway üzerinden servisler: Product, Inventory, Order.

---

## 2. fetcher.ts

- `fetcher` fonksiyonu, frontend’in **tüm HTTP isteklerini merkezi ve tip güvenli bir şekilde yönetmesini sağlar**.

```tsx
export async function fetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, { credentials: "include", ...options });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || data?.error || text || res.statusText;
    const err = new Error(message);
    (err as any).status = res.status;
    throw err;
  }
  return data as T;
}
```

### Görevleri:

1. HTTP isteklerini yönetir (GET, POST, PUT, DELETE vb.).
2. `credentials: "include"` ile cookie/session token’ları gönderir.
3. Gelen yanıtı JSON’a çevirir, boşsa `null` döner.
4. Hata yönetimi yapar ve backend’den gelen mesajı kullanır.
5. Generic `<T>` ile tip güvenliği sağlar (örneğin `fetcher<ApiResponse<Product[]>>`).

---

## 3. types

### ApiResponse.ts → API’den gelen yanıt formatı:

```tsx
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  data: ApiErrorData;
}

export interface ApiErrorData {
  timestamp: string;
  status: number;
  error: string;
  code: string;
  message: string;
}
```

### Product.ts

```tsx
export type Product = {
  id: string;
  name: string;
  skuCode: string;
  description?: string;
  price: number;
};
```

### Inventory.ts

```tsx
export type Inventory = {
  id: string;
  skuCode: string;
  quantity: number;
};

export type InventoryBoolean = { available: boolean };
```

### Order.ts

```tsx
export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export type OrderRequest = {
  skuCode: string;
  price: number;
  quantity: number;
};

export type OrderResponse = {
  id: number;
  orderNumber: string;
  skuCode: string;
  price: number;
  quantity: number;
  status: OrderStatus;
};
```

- Bu typelar sayesinde **servislerden gelen veriler ve UI componentleri arasında tip güvenliği** sağlanır.
- Örneğin `InventoryCard` componenti `Inventory` tipinde veri alır ve doğru alanları render eder.

---

## 4. services

- Frontend tarafında bulunan services klasörü, UI component’leri ile backend API arasında bir köprü görevi görür.
- Bu yapının temel amacı, component’lerin doğrudan fetch çağrılarıyla uğraşmasını engellemek ve tüm veri işlemlerini merkezi bir katmanda toplamaktır.
- Böylece:
  - UI tarafı sadece işlenmiş veriyi kullanır, API’nin nasıl çalıştığını bilmek zorunda kalmaz.
  - Kod tekrarları en aza iner, bakım ve geliştirme süreçleri kolaylaşır.
  - Endpoint değişiklikleri sadece servis fonksiyonlarında yapılır, yüzlerce component etkilenmez.

### handlResponse<T>

```tsx
async function handleResponse<T>(promise: Promise<ApiResponse<T>>): Promise<T> {
  const response = await promise;

  if (!response.success) {
    const errorMessage =
      typeof response.data === "object" &&
      response.data !== null &&
      "message" in response.data
        ? (response.data as any).message
        : "Unknown error";

    throw new Error(errorMessage);
  }

  return response.data;
}
```

- Bu yardımcı fonksiyon, API’den gelen tüm yanıtları standart bir formata oturtur.

**Görevleri:**

- Backend her zaman `ApiResponse<T>` formatında cevap döndüğü için, fonksiyon yanıtı tek noktada kontrol eder.
- `success: false` durumunda, backend’in döndürdüğü hata mesajı yakalanır; mesaj yoksa `"Unknown error"` fırlatılır.
- Generic `<T>` kullanımı sayesinde dönen veriler tip güvenliğiyle componentlere ulaşır.

- Sonuç olarak, UI tarafında ekstra `if (!response.success)` kontrolleri yazmaya gerek kalmaz; component’ler sadece temiz ve işlenmiş veriyle çalışır.

### Product

```tsx
const BASE = "http://localhost:9000/api/product";

export const createProduct = (product: Omit<Product, "id">) =>
  handleResponse(
    fetcher<ApiResponse<Product>>(`${BASE}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
```

- Ürünlerin eklenmesi, silinmesi, güncellenmesi ve listelenmesi gibi CRUD işlemlerini soyutlar.
- Component’ler doğrudan endpoint adreslerini bilmek yerine sadece `createProduct`, `updateProduct` gibi fonksiyonları çağırır.

### Inventory

```tsx
const BASE = "http://localhost:9000/api/inventory";

export const addInventory = (inventory: Omit<Inventory, "id">) =>
  handleResponse(
    fetcher<ApiResponse<Inventory>>(BASE, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(inventory),
      headers: { "Content-Type": "application/json" },
    })
  );
```

- Ürünlerin stok durumunu yönetir (ekleme, silme, miktar güncelleme).
- `InventoryCard` gibi component’ler sadece bu servisten veri çeker, stok yönetiminin detaylarını bilmez.

Order

```tsx
const BASE = "http://localhost:9000/api/order";

export const createOrder = (order: OrderRequest) =>
  handleResponse(
    fetcher<ApiResponse<OrderResponse>>(`${BASE}`, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
```

- Kullanıcıların frontend’de yaptıkları sepet işlemlerini backend’e taşır.
- Siparişin durumu (PENDING, CONFIRMED, CANCELLED) backend’den alınır ve UI’ya güncel şekilde yansıtılır.

---

## 5. Sayfa Bazlı Açıklama

**A. Home Page**

![image.png](<Frontend(Next%20js)/image.png>)

**B. Product Page**

- Wrapper: `ProductBarWrapper`
- Componentler: `ProductList`, `ProductCard`, `ProductCreateCard`
- Fonksiyonlar: Ürün ekleme, silme, güncelleme, arama
- Servisler: `getAllProducts`, `createProduct`, `updateProduct`, `deleteProduct`, `searchProductsByName`

![image.png](<Frontend(Next%20js)/image1.png>)

![image.png](<Frontend(Next%20js)/image2.png>)

**C. Inventory Page**

- Wrapper: `InventoryBarWrapper`
- Componentler: `InventoryList`, `InventoryCard`, `CreateInventoryCard`, `AddQuantitySection`, `DeleteStocks`
- Fonksiyonlar: Stok ekleme, silme, miktar güncelleme
- Servisler: `getAllInventory`, `addInventory`, `addStock`, `setQuantityZeroById`, `deleteInventoryById`

![image.png](<Frontend(Next%20js)/image3.png>)

![image.png](<Frontend(Next%20js)/image4.png>)

**D. Order Page**

- Wrapper: `OrderWrapper`
- Componentler: `OrderList`, `OrderCard`, `CancelOrder`, `ConfirmOrder`
- Fonksiyonlar: Sipariş oluşturma, onaylama, iptal etme
- Servisler: `getAllOrders`, `createOrder`, `confirmOrder`, `cancelOrder`

![image.png](<Frontend(Next%20js)/image5.png>)
