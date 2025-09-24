# Mehmet Guzel Microservice Project

# Proje Tanıtımı

Bu projeyi geliştirmemdeki temel amaç, **mikroservis mimarisi** kullanarak modern, ölçeklenebilir ve güvenli bir web uygulaması geliştirmekti.

- Ayrıca farklı teknolojileri birlikte kullanarak gerçek bir yazılım geliştirme sürecini uçtan uca deneyimlemek istedim.
- Bunun için bir **Envanter Yönetim Sistemi** tasarladım.
- Projede hem backend hem frontend bileşenleri, hem de container tabanlı yapılandırma adımları yer aldı.
- Bu sayede hem teorik bilgimi pekiştirdim hem de gerçek hayata uyarlanabilir bir çözüm ortaya koydum.

## Kullanılan Teknolojiler:

- **Frontend:** Next.js
- **Backend:** Java (Spring Boot)
- **Database:** MySQL, MongoDB

## Kazanımlar

Bu proje boyunca birçok yeni deneyim elde ettim:

- **Spring Boot ve Spring Framework:** Bağımsız, güvenli ve ölçeklenebilir servisler geliştirdim.
- **JPA & ORM:** Veri tabanı yönetimi ve servis katmanı tasarımı konusunda pratik yaptım.
- **Mikroservis mimarisi:** Servislerin bağımsızlığını, iletişimini ve merkezi yönetimini öğrendim.
- **API Gateway:** Servisler arası trafik yönetimi, güvenlik (CORS, authentication, authorization) ve tek giriş noktası konseptini deneyimledim.
- **MySQL & MongoDB:** Farklı veri tabanı türlerinin güçlü ve zayıf yanlarını kıyaslama fırsatı buldum.
- **Docker Compose:** Her servisin kendi veritabanı ile container tabanlı orkestrasyonunu deneyimledim.
- **Clean Code & SOLID:** Okunabilir, sürdürülebilir ve geliştirilebilir kod yazma becerisi kazandım.
- **Refactoring & Performans Optimizasyonu:** Kod kalitesini artırmayı öğrendim.
- **Unit Test:** Test odaklı geliştirme pratiği yaptım.
- **Modern Yazılım Süreçleri:** Git, Maven, CI/CD benzeri süreçlerle gerçek iş akışını deneyimledim.

[Proje Yapısı ve Katmanlarının Genel Görünümü](Mehmet_Guzel_Microservice_Project_README/Proje_Yapısı_ve_Katmanlarının_Genel_Görünümü.md)

---

# Proje Detayları

Öğrenme hedefim doğrultusunda bir **envanter yönetim sistemi** tasarlamaya karar verdim.

- Her servis bağımsız çalışacak şekilde ve kendi veritabanına sahip olacak şekilde yapılandırıldı.
- **Inventory Service (MySQL):** Ürünlerin stok yönetimi ve güncel miktarlarının takibi.
- **Product Service (MongoDB):** Ürün bilgileri (isim, açıklama, fiyat vb.) yönetimi.
- **Order Service (MySQL):** Sipariş süreçlerinin yönetimi ve stok ile entegrasyonu.
- Servisler farklı portlarda çalışacak şekilde tasarlandı ve iletişimleri **API Gateway** üzerinden sağlandı.
- API Gateway sayesinde frontend ve backend arasındaki tüm trafik merkezi olarak yönetildi, güvenlik (CORS, kimlik doğrulama, yetkilendirme vb.) ve servisler arası iletişim tek noktadan kontrol edildi.
- Frontend tarafında **Next.js** kullanılarak kullanıcıların ürün görüntüleme, sipariş oluşturma ve stok durumunu takip etme fonksiyonları geliştirildi.
- Proje geliştirme sürecinde **Clean Code prensipleri**, **SOLID** kuralları ve düzenli **refactoring** uygulanarak kod kalitesi sürekli iyileştirildi.

## Docker Compose

Her mikroservis kendi veritabanına sahip olacak şekilde yapılandırıldı. Bunun için **Docker Compose** kullanarak her servis için bağımsız konfigürasyon dosyaları oluşturdum.

- Böylece:
  - Servisler birbirinden bağımsız şekilde çalışabiliyor,
  - Veritabanlarının yaşam döngüsü (deployment, persistence, configuration) ayrı ayrı yönetilebiliyor.

[**Docker Compose & application.properties Yapılandırmaları**](Mehmet_Guzel_Microservice_Project_README/Docker_Compose_&_application.properties_Yapılandırmaları.md)

## API GATEWAY

Mikroservis mimarisinde servisler farklı portlarda bağımsız çalışıyor. Ancak frontend’in her servisin IP’sini veya portunu bilmesi pratik değil.

Bu sorunu çözmek için **API Gateway** tasarladım:

- Frontend, tüm isteğini sadece API Gateway’e gönderiyor.
- Gateway, bu isteği doğru servise yönlendiriyor.
- Güvenlik, kimlik doğrulama ve yetkilendirme gibi işlemler tek bir noktadan yönetiliyor.

[API Gateway – Kod ve İşleyiş Açıklaması](Mehmet_Guzel_Microservice_Project_README/API_Gateway_Kod_ve_İşleyiş_Açıklaması.md)

## Product, Order, Inventory Service

- **Product Service**, projenin merkezinde yer alan ve ürün verilerini yöneten mikroservistir. Temel amacı, ürünlerin **isim, açıklama, SKU kodu, açıklama ve fiyat** gibi bilgilerini güvenli, tutarlı ve hızlı bir şekilde yönetmek ve diğer servislerin bu verilere kolay erişimini sağlamaktır.
- **Inventory Service**, ürünlerin **stok miktarlarını ve depodaki durumlarını** yönetir. Bu servis sayesinde, her ürünün güncel stok durumu takip edilebilir, stok yetersizliği veya fazla stok durumları tespit edilebilir. Product Service ile entegre çalışarak, ürünlerin varlığını ve miktarını doğrular; Order Service’in doğru stok bilgisiyle işlem yapmasını garanti eder.
- **Order Service**, sipariş süreçlerinin yönetiminden sorumludur. Kullanıcıların oluşturduğu siparişleri alır, stok durumunu kontrol eder (Inventory Service ile iletişim kurarak) ve siparişin doğru bir şekilde kaydedilmesini sağlar. Böylece ürünlerin satışa sunulması, stoktan düşülmesi ve kullanıcıya doğru bilgiler sunulması bu servis üzerinden güvenli bir şekilde yürütülür.

[Product & Order & Inventory Service](Mehmet_Guzel_Microservice_Project_README/Product_&_Order_&_Inventory_Service.md)

## Frontend

Bu projede **Next.js** kullanarak kullanıcı arayüzünü geliştirdim. Frontend’in temel amacı, kullanıcıların ürünleri görüntülemesi, stok durumunu takip etmesi ve sipariş oluşturabilmesidir.

- **Kullanıcı İşlevleri:**
  - Ürünleri listeleme ve arama
  - Yeni ürün ekleme
  - Stok durumunu görüntüleme ve güncelleme
  - Sipariş oluşturma, onaylama ve iptal etme
- **Mimari ve Yapı:**
  - Sayfalar: `/product`, `/inventory`, `/order`
  - Her sayfa kendi wrapper ve component hiyerarşisine sahip
  - Component’ler, SRP prensibine uygun şekilde ayrıldı (örn. `ProductCard`, `OrderCard`, `InventoryCard`)
- **Etkileşimler ve Servisler:**
  - Frontend, mikroservislerle **API Gateway** üzerinden iletişim kurar.
  - Her sayfa, ilgili servislerden veri çekip kullanıcıya sunar.
  - React state ve hooks (`useState`, `useEffect`, `useCallback`) ile veri yönetimi sağlanır.
  - Toast ve loading indicator’lar ile kullanıcı deneyimi iyileştirildi.
- **Tasarım ve Kullanıcı Deneyimi:**
  - Modern ve responsive tasarım için **TailwindCSS** kullanıldı.
  - Formlar, kartlar ve butonlar kullanıcı dostu olacak şekilde tasarlandı.
  - Gradient, shadow ve hover efektleri ile görsellik artırıldı.

[Frontend(Next.js)](<Mehmet_Guzel_Microservice_Project_README/Frontend(Next.js).md>)

---

- Developed by **Mehmet Güzel**
- Contact: mehmetg120031@gmail.com
