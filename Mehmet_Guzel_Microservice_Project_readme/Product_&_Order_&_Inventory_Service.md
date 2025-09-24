# Product & Order & Inventory Service

- Bu üç servis birlikte çalışarak, **ürün yönetimi, stok kontrolü ve sipariş takibi** süreçlerini eksiksiz ve ölçeklenebilir bir şekilde sağlar.
- Product Service, veri odaklı bir merkez görevi görürken, Inventory ve Order servisleri operasyonel süreçleri yönetir;
- tüm sistem API Gateway üzerinden tek bir noktadan koordine edilir.

## Kodlarım

- (Product Service)[]
- (Inventory Service)[]
- (Order Service)[]

## 1. Domain Model

### Product

İlk adımda, MongoDB üzerinde saklanacak ürün verisi için **domain model** oluşturuldu.

```java
@Document(value = "product")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data

public class Product {
    @Id
    private String id;
    private String name;
    private String skuCode;
    private String description;
    private BigDecimal price;
}
```

- **@Document** → MongoDB’deki `product` koleksiyonuna karşılık gelir.
- **@Builder + @Data** → Nesne oluşturma ve getter/setter yükünü ortadan kaldırarak okunabilirliği artırır.

### Inventory

```java
@Entity
@Table(name = "t_inventory")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Inventory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String skuCode;
    private Integer quantity;
}
```

### Order

```java
@Entity
@Table(name = "t_orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    private String skuCode;
    private BigDecimal price;
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public void confirm() {
        if (this.status != OrderStatus.PENDING) {
            throw new OrderCannotBeConfirmedException(this.id);
        }
        this.status = OrderStatus.CONFIRMED;
    }
}
```

---

## 2. API Response ve DTOs

 Tüm servisler için geçerli olacak bir `ApiResponse` yapısı tasarladım.

- Böylece her API çağrısı, başarılı ya da hatalı olsun, aynı formatta yanıt verecek.

```json
{
  "success": true,
  "message": "New Product Created",
  "data": {
    "id": "64fa1b3c2a4f",
    "name": "Laptop",
    "skuCode": "LAP123",
    "description": "High performance laptop",
    "price": 1500.00
  }
}
```

### API Response

- Başarılı yanıtları warplayan ve her serviste tekrar tekrar kullanılabilen generic yapı

```java
public record ApiResponse<T>(boolean success, String message, T data) {
    public static <T> ApiResponse<T> ok(T data, String message) {
        return new ApiResponse<>(true, message, data);
    }
}
```

### ErrorResponse

- Hataları merkezi bir formatta return etmek için tasarlanan yapı

```java
public record ErrorResponse(
        String code,
        int status,
        String type,
        String timestamp
) {}
```

Bu yaklaşımın en büyük faydasını, frontend i oluştururken gördüm. Tutarlı bir arayüze sahip oldum ve backendden gelen mesajları yapılandırmakla çok fazla uğraşmama gerek kalmadı. Çünkü tüm serviilser aynı yapıda response döndürüyor.

Kullanıcıdan gelen istekleri ve kullanıcıya dönecek yanıtları yönetmek için `record` yapıları kullandım.

### Product

```java
public record ProductRequest(String id, String name, String skuCode, String description, BigDecimal price) {}
public record ProductResponse(String id, String name, String skuCode, String description, BigDecimal price) {}
```

### Inventory

```java
public record InventoryRequest(Long id, String skuCode, Integer quantity)  {}
public record InventoryResponse(Long id, String skuCode, Integer quantity) {}
```

### Order

```java
public record OrderRequest(Long id, String orderNumber, String skuCode, BigDecimal price, Integer quantity, OrderStatus status) {}
public record OrderResponse(Long id, String orderNumber, String skuCode, BigDecimal price, Integer quantity, OrderStatus status) { }
```

---

## 3. Controller

Controller katmanı ise yalnızca endpoint tanımlamalarını yapıyor. Burada dikkat ettiğim nokta:

- Controller hiçbir iş mantığı içermiyor.
- Gelen request’i doğrudan service katmanına iletiyor.
- Service’den aldığı yanıtı `ApiResponse` aracılığıyla kullanıcıya dönüyor.

### Product

```java
@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProductResponse> createProduct(@Valid @RequestBody ProductRequest productRequest){
        return ApiResponse.ok(
        productService.createProduct(productRequest), "New Product Created");
    }
    
    ....
    ...
    ..
    ..
```

### Inventory

```java
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<InventoryResponse> addInventory(@Valid @RequestBody InventoryRequest request) {
        return ApiResponse.ok(inventoryService.createInventory(request), "Inventory created successfully");
    }
    
    ....
    ...
    ..
    ..
```

### Order

```java
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderResponse> placeOrder(@Valid @RequestBody OrderRequest orderRequest) {
        return ApiResponse.ok(orderService.placeOrder(orderRequest),"Order Created");
    }
    
    ....
    ...
    ..
    ..
```

---

## 4. Repository

Service katmanında kullanılacak database sorguları ve işlemleri için her bir servis için Repository interface i oluşturdum.

### Product

- `MongoRepository` kullanarak, CRUD işlemlerinin çoğunu Spring Data’ya bıraktım. Ekstra ihtiyacım olan birkaç sorguyu ekledim

```java
public interface ProductRepository extends MongoRepository<Product,String> {

    List<Product> findByNameContainingIgnoreCase(String name);

    boolean existsBySkuCode(String skuCode);

    Product findBySkuCode(String skuCode);
} 
```

- Burada method naming convention sayesinde **SQL veya MongoDB query yazmadan**, ihtiyacım olan tüm sorguları otomatik olarak Spring Data oluşturuyor.
- Bu, hem boilerplate kodu azaltıyor hem de repository’yi okunabilir ve sürdürülebilir hale getiriyor.

### Inventory

- Inventory servisinde MySQL kullandım ve CRUD işlemleri için `JpaRepository` üzerinden çalıştım. Ancak stok yönetimi için birkaç özel sorgu ekledim:

```java
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    boolean existsBySkuCodeAndQuantityGreaterThanEqual(String skuCode, Integer quantity);

    boolean existsBySkuCode(String skuCode);

    Inventory findInventoryBySkuCode(String skuCode);

    @Query("SELECT i.quantity FROM Inventory i WHERE i.skuCode = :skuCode")
    Integer findInventoryQuantityBySkuCode(@Param("skuCode") String skuCode);}
```

### Order

- Order servisinde de MySQL kullanıldığı için `JpaRepository` üzerinden CRUD işlemleri gerçekleştirdim:

```java
public interface OrderRepository extends JpaRepository<Order,Long> {}
```

- Basit CRUD operasyonları için ekstra method yazmadım çünkü order mantığı genellikle **servis katmanında transaction ve inventory check** ile kontrol ediliyor.

---

## 5. Service ve Validation Katmanları

- Service katmanında Clean Code prensiplerine özellikle dikkat ettim.
- Her metodun tek bir sorumluluğu olması ilkesini benimseyerek, metodları küçük, anlamlı ve yönetilebilir adımlara böldüm.
- Validation katmanında, kullanıcıdan gelen isteklerin işlenmeye uygun olup olmadığını kontrol ettim ve yalnızca doğrulanan verileri service katmanında işledim.

### Product

```java
// Service
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final InventoryClient inventoryClient;
    private final ProductValidator productValidator;

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        validateProductRequest(request);
        Product product = mapToEntity(request);
        Product savedProduct = persistProduct(product, ActionType.CREATED);
        return mapToResponse(savedProduct);
    }
    
		....
		...
		..
		..
```

```java
  
  // Service layer
  private void validateProductRequest(ProductRequest request){
      productValidator.validateSkuCode(request.skuCode());
      productValidator.validateName(request.name());
      productValidator.validateDescription(request.description());
      productValidator.validatePrice(request.price());
  }

	// Validation Layer
  public void validateSkuCode(String skuCode) {
      validateSkuCodeFormat(skuCode);
      ensureSkuNotInInventory(skuCode);
      ensureProductNotExists(skuCode);
  }
	....
	...
	..
	..
```

### Inventory

```java
@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    public InventoryResponse createInventory(InventoryRequest request) {
        inventoryValidator.validateInventoryRequest(request.skuCode(), request.quantity());
        if (inventoryRepository.existsBySkuCode(request.skuCode())) {
            throw new InvalidInventoryRequestException("SKU code already exists");
        }
        Inventory inventory = mapToEntity(request);
        return saveAndLog(inventory, "Created inventory:");
    }
    
		....
		...
		..
		..
```

```java
 	// Validation Layer
  public void validateInventoryRequest(String skuCode, Integer quantity) {
      validateSkuCode(skuCode);
      validateQuantity(quantity);
  }
	....
	...
	..
	..
```

### Order

```java
@RequiredArgsConstructor
public class OrderService {

    @Transactional
    public OrderResponse placeOrder(OrderRequest request) {
        validateRequest(request);
        validateAndCancelIfOutOfStock(request);
        Order order = createOrderWithPrice(request);
        reduceStock(request.quantity(), request.skuCode());

        saveOrder(order);

        return mapToResponse(order);
    }
```

```java
		// Service Layer
    public void validateOrderRequest(OrderRequest request) {
        orderValidator.validateSkuCode(request.skuCode());
        orderValidator.validatePrice(request.price());
        orderValidator.validateQuantity(request.quantity());
    }
  
		//Validation Layer
    public void validateQuantity(Integer quantity) {
        if (quantity == null) throw new InvalidOrderRequestException("Quantity cannot be null");
        if (quantity <= 0) throw new InvalidOrderRequestException("Quantity must be greater than 0");
    }
    ....
    ...
```

---

## 6. Mapper

- Mapper sınıfı sayesinde DTO ↔ Entity dönüşümleri merkezi ve tekrarlanabilir hale geldi.
- Bu katmanı ayırarak, hem service kodunu sadeleştirdim hem de ileride başka bir mapping ihtiyacı çıkarsa tek bir noktadan yönetilebilir hale getirdim.

### Product

### Inventory

```java
@Component
public class InventoryMapper {
  public Inventory toEntity (InventoryRequest inventoryRequest) {
      return Inventory.builder()
              .id(inventoryRequest.id())
              .skuCode(inventoryRequest.skuCode())
              .quantity(inventoryRequest.quantity())
              .build();
	  }
		....
		...
```

### Order

```java
@Component
public class OrderMapper {
    public Order toEntity(OrderRequest request) {
        return Order.builder()
                .orderNumber(UUID.randomUUID().toString())
                .skuCode(request.skuCode())
                .price(request.price())
                .quantity(request.quantity())
                .build();
    }
```

---

## **7. Servisler Arası İletişim**

- Mikroservis mimarisinde servisler birbirinden bağımsızdır, ancak çoğu zaman veri alışverişine ihtiyaç duyarlar.
- Servisler arası iletişim kritik öneme sahiptir. Bu iletişimi **REST tabanlı client’lar** ile gerçekleştirdim ve her servisi interface bazlı soyutladım. Böylece **loosely coupled** bir yapı elde ettim.

### **RestClient Yapılandırması**

- REST çağrılarını merkezi ve yönetilebilir hale getirmek için `RestClientConfig` sınıfını oluşturdum.
- Burada API Gateway üzerinden çağrı yapılmasını sağlayarak, servislerin doğrudan birbirine bağımlı olmasını önledim.

```java
// Örnek bir InventoryClient Config dosyası5

@Configuration
public class RestClientConfig {

    @Value("${apiGateway.url}")
    private String apiGatewayUrl;

    @Bean
    public InventoryClient inventoryClient() {
        RestClient restClient = RestClient.builder()
                .baseUrl(apiGatewayUrl)
                .build();

        var restClientAdapter = RestClientAdapter.create(restClient);
        var httpServiceProxyFactory = HttpServiceProxyFactory.builderFor(restClientAdapter).build();
        return httpServiceProxyFactory.createClient(InventoryClient.class);
    }
}
```

Bu yapı sayesinde:

- **API Gateway’in merkezi yönlendirme avantajını** kullanıyorum.
- Her client interface’i bağımsız ve test edilebilir.
- Servisler arası değişikliklerde minimal refactoring yeterli oluyor.

### **Product → Inventory İletişimi**

Product Service, stok doğrulama ve SKU kontrolü için Inventory servisinden veri alır:

```java
public interface InventoryClient {

    @GetExchange("/api/inventory/validate")
    ApiResponse<Boolean> isSkuCodeValid(@RequestParam("skuCode") String skuCode);

    @GetExchange("/api/inventory/{skuCode}/stock")
    ApiResponse<Integer> getAllStocksBySkuCode(@PathVariable String skuCode);

}
```

### **Inventory → Product İletişimi**

Inventory servisinde ise, stok yönetimi sırasında Product bilgisine erişmek gerekir:

```java
public interface ProductClient {

@GetExchange("/api/product/get-id/{skuCode}")
String getProductIdBySkuCode(@PathVariable String skuCode);

@DeleteExchange("/api/product")
ApiResponse<Void> deleteProduct(@RequestParam("id") String id);
}
```

### **Order → Inventory ve Product İletişimi**

Sipariş yönetimi sırasında hem stok hem de ürün fiyat bilgisi kritik önemdedir. Order Service, Product ve Inventory servislerine aşağıdaki client interface’leri ile erişir:

```java
public interface InventoryClient {

    @GetExchange("/api/inventory")
    ApiResponse<Boolean> isInStock(@RequestParam("skuCode") String skuCode,
                                   @RequestParam("quantity") Integer quantity);

    @GetExchange("/api/inventory/validate")
    ApiResponse<Boolean> isSkuCodeValid(@RequestParam("skuCode") String skuCode);

    @PatchExchange("/api/inventory/reduceStock/{skuCode}")
    ApiResponse<Void> reduceStock( @PathVariable String skuCode, @RequestParam("quantity") Integer quantity);
}
```

```java
public interface ProductClient {

    @GetExchange("/api/product/price/{skuCode}")
    ApiResponse<BigDecimal> getProductPrice(@PathVariable("skuCode") String skuCode);
}
```

Bu client yapılandırmaları sayesinde:

- Tüm servisler **loosely coupled** ve test edilebilir.
- API Gateway sayesinde tüm çağrılar merkezi olarak yönlendirilir.
- Product, Inventory ve Order servisleri, kendi alanlarına odaklanırken, gerekli veri alışverişi **interface bazlı, güvenli ve okunabilir** şekilde sağlanır.

Bu yaklaşım, **gerçek dünya mikroservis projelerinde best-practice** olarak kabul edilen bir tasarım sunar ve sistemi hem esnek hem de sürdürülebilir kılar.

---

## 8. Exception Handling

Sistemlerde, hata yönetimi en az başarılı yanıtlar kadar önemlidir. 

- Bunun için global bir `GlobalExceptionHandler` geliştirdim.
- Burada her exception türü, ApiResponse yapısına uygun olarak yakalanıyor ve anlamlı bir yanıt döndürülüyor.

Bu yaklaşım sayesinde:

- Client tarafında tahmin edilebilir hata mesajları,
- Backend tarafında ise tutarlı bir log yapısı sağlandı.

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    public ErrorResponse buildErrorDetail(String code, HttpStatus status){
        return new ErrorResponse(
                code,
                status.value(),
                status.getReasonPhrase(),
                java.time.ZonedDateTime.now().toString()
        );
    }

    public ResponseEntity<ApiResponse<ErrorResponse>> buildApiResponse(HttpStatus status, String message){
        String code = ErrorCode.getErrorCode(message);
        ErrorResponse errorDetail = buildErrorDetail(code, status);
        ApiResponse<ErrorResponse> response = new ApiResponse<>(false, message, errorDetail);
        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse<ErrorResponse>> handleProductNotFoundException(ProductNotFoundException ex) {
        return buildApiResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

```

---

## 9. Sonuç

Tüm bu parçalar bir araya geldiğinde; **temiz kod, DDD’ye yakın tasarım ve modern Spring özelliklerini** kullanan, hem güvenli hem de ölçeklenebilir bir **Product Service** ortaya çıktı.

Bu servislerin güçlü yönleri:

Tutarlı API yanıtları,

- Katmanlı ve ayrıştırılmış mimari,
- Servisler arası güvenli ve esnek iletişim,
- Güçlü validation ve hata yönetimi,
- Clean Code prensiplerine uygun yapı.

Bence bu haliyle, yalnızca çalışır bir servis değil; aynı zamanda **öğrenilebilir ve genişletilebilir** servisler ortaya koymuş oldum.