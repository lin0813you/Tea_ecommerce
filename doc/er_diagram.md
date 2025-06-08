```mermaid
erDiagram
  USERS {
    int id PK
    string name
    string email UN
    string phone UN
    string passwordHash
    string role
  }
  PRODUCTS {
    int id PK
    string name
    string description
    double price
    string imageUrl
    string type
  }
  INVENTORY {
    int productId PK
    int stock
  }
  CART_ITEMS {
    int userId FK
    int productId FK
    int quantity
    PK(userId, productId)
  }
  ORDERS {
    int id PK
    int userId FK
    datetime orderDate
    string status
    double totalAmount
  }
  ORDER_ITEMS {
    int orderId FK
    int productId FK
    int quantity
    double price
    PK(orderId, productId)
  }
  PAYMENTS {
    int id PK
    int orderId FK UN
    double amount
    string status
    string method
  }
  MATERIAL_ORDERS {
    int id PK
    int productId FK
    int staffId FK
    int supplierId FK
    int quantity
    string status
  }
  SETTINGS {
    string key PK
    string value
  }

  USERS ||--o{ CART_ITEMS : has
  PRODUCTS ||--o{ CART_ITEMS : contains
  USERS ||--o{ ORDERS : places
  ORDERS ||--o{ ORDER_ITEMS : includes
  PRODUCTS ||--o{ ORDER_ITEMS : contains
  ORDERS ||--o{ PAYMENTS : has
  PRODUCTS ||--|| INVENTORY : tracks
  PRODUCTS ||--o{ MATERIAL_ORDERS : concerns
  USERS ||--o{ MATERIAL_ORDERS : requested_by
  USERS ||--o{ MATERIAL_ORDERS : processed_by
```
