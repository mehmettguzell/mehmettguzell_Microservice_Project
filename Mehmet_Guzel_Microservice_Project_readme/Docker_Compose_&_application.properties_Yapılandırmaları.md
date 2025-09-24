# Docker Compose & application.properties Yapılandırmaları

### **Product Service (MongoDB):**

`mongo:7.0.5` imajı kullanıldı. Root kullanıcı bilgileri environment değişkenleriyle tanımlandı ve `./data` volume’u üzerinden kalıcı veri saklama sağlandı.

```tsx
version: '4'
services:
  mongodb:
    image: mongo:7.0.5
    container_name: mongodb
    ports:
      - "27017:27017"
    environment:
    // Güvenlik için kullanıcı adı ve parola güçlü seçilmelidir 
    
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: product-service
    volumes:
      - ./data:/data/db
```

```java
spring.application.name=product-service
spring.data.mongodb.uri=mongodb://root:password@localhost:27017/product_service_mehmettguzell?authSource=admin
apiGateway.url=http://localhost:8082
```

---

### **Inventory Service (MySQL):**

`mysql:8.3.0` imajı kullanıldı. Başlangıç tabloları ve şemalar `init.sql` üzerinden otomatik oluşturulacak şekilde yapılandırıldı. Veri sürekliliği için `./docker/mysql/data` volume’u eklendi.

```tsx
inventory service:
version: '3.9'
services:
  mysql:
    image: mysql:8.3.0
    container_name: inventory-service-mysql
    environment:
    // Güvenlik için kullanıcı adı ve parola güçlü seçilmelidir 

      MYSQL_ROOT_PASSWORD: mysql
    ports:
      - "3316:3306"
    volumes:
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./docker/mysql/data:/var/lib/mysql
```

```java
spring.application.name=inventory-service
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url =jdbc:mysql://localhost:3316/inventory_service
spring.datasource.username=root
spring.datasource.password=mysql
spring.jpa.hibernate.ddl-auto=none
server.port=8082
apiGateway.url=http://localhost:9000
```

---

### **Order Service (MySQL):**

Inventory Service ile benzer şekilde `mysql:8.3.0` imajı kullanıldı. Ayrı bir container ve volume yapısıyla, sipariş verileri envanterden tamamen izole edildi.

```tsx
	
order service:
version: '3.9'
services:
  mysql:
    image: mysql:8.3.0
    container_name: order-service-mysql
    environment:
	  // Güvenlik için kullanıcı adı ve parola güçlü seçilmelidir 
  
      MYSQL_ROOT_PASSWORD: mysql
    ports:
      - "3306:3306"
    volumes:
      - ./mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
      - ./docker/mysql/data:/var/lib/mysql

bunlar da servislerin docker compose ları bunu nasıl anlatırım
```

```java
spring.application.name=order-service
spring.datasource.url =jdbc:mysql://localhost:3306/order_service
spring.datasource.username=root
spring.datasource.password=mysql
spring.jpa.hibernate.ddl-auto=none
server.port=8081
apiGateway.url=http://localhost:9000
```