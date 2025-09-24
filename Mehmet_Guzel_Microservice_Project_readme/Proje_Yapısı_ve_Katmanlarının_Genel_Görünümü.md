# Proje Yapısı ve Katmanlarının Genel Görünümü

### Öne Çıkan Özellikler

- **CRUD İşlemleri:** Ürün ekleme, güncelleme, silme ve listeleme işlemleri RESTful API ile sağlanır.
- **Validation Katmanı:** SKU, isim, açıklama ve fiyat gibi alanlar için kapsamlı doğrulama kuralları uygulanır; hatalı veri girişleri önlenir.
- **Inventory Entegrasyonu:** Inventory Service ile entegre çalışır; ürün silindiğinde veya güncellendiğinde stok durumu otomatik olarak güncellenir.
- **Transaction Yönetimi:** Kritik işlemler `@Transactional` ile veri bütünlüğü garanti edilir.
- **Mapper & DTO Kullanımı:** `ProductRequest` ve `ProductResponse` record’ları sayesinde Entity ↔ DTO dönüşümleri temiz ve güvenli şekilde yapılır.
- **Logging & Exception Handling:** Tüm işlemler loglanır; özel exception’lar ile detaylı hata yanıtları döndürülür.

Bu proje, **Spring Boot mikroservis mimarisi** ile geliştirilmiş olup, her klasör ve katmanın belirli bir rolü vardır. Aşağıda proje yapısı ve her klasörün sorumlulukları açıklanmıştır:

### 1. `client`

- **Amaç:** Diğer mikroservislerle veya dış sistemlerle iletişim kurmak için kullanılan istemci sınıfları.
- **Örnek:** REST çağrıları yapan `WebClient` veya özel API client sınıfları.

---

### 2. `config`

- **Amaç:** Uygulama genel konfigürasyon ayarlarını içerir.
- **Örnekler:**
    - Veritabanı bağlantıları (MongoDB / MySQL)
    - CORS ve güvenlik ayarları
    - Custom Bean tanımlamaları

---

### 3. `controller`

- **Amaç:** HTTP isteklerini karşılayan katman (servisin giriş kapısı).
- **Görevleri:**
    - Kullanıcıdan gelen requestleri almak (`GET`, `POST`, `PUT`, `DELETE`)
    - Service katmanına yönlendirmek
    - Response döndürmek

---

### 4. `dto` (Data Transfer Object)

- **Amaç:** Controller ile Service veya servisler arası veri transferini sağlamak.
- **Avantajları:**
    - Gereksiz alanları gizleyerek veri güvenliği sağlamak
    - Veri formatını standardize etmek

---

### 5. `exception`

- **Amaç:** Özel hata ve istisna yönetimi.
- **Örnekler:**
    - `ProductNotFoundException`
    - Global exception handler (`@ControllerAdvice`)

---

### 6. `mapper`

- **Amaç:** Entity ile DTO arasında dönüşüm yapmak.
- **Örnekler:**
    - `Product` entity → `ProductDTO`
    - `ProductDTO` → `Product` entity
- Genellikle **MapStruct** veya manuel mapper sınıfları kullanılır.

---

### 7. `model`

- **Amaç:** Veritabanı tablolarını temsil eden sınıflar (Entity’ler).
- **Örnek:** `Product.java` (MongoDB collection veya SQL table mapping)

---

### 8. `repository`

- **Amaç:** Database ile direkt iletişim kuran katman (Data Access Layer).
- **Örnek:** Spring Data ile `MongoRepository` veya `JpaRepository` interface’leri.

---

### 9. `service`

- **Amaç:** İş mantığının uygulandığı katman.
- **Görev:** Controller’dan gelen requestleri işleyip repository ile veri yönetimi.
- **Örnek:** Ürün ekleme, silme, fiyat güncelleme işlemleri.

---

### 10. `validation`

- **Amaç:** Veri doğrulama ve kuralların uygulanması.
- **Örnekler:**
    - `@Valid` ile gelen DTO doğrulaması
    - Özel validator sınıfları (SKU formatı, fiyat aralığı, vs.)

---

### Kısaca Akış

- **Controller** → Kullanıcı veya frontend isteklerini alır
- **Service** → İş mantığını uygular
- **Repository** → Veritabanı işlemlerini yapar
- **Model / DTO / Mapper** → Veri yapıları ve dönüşümler
- **Config / Client / Validation / Exception** → Destekleyici altyapıyı sağlar