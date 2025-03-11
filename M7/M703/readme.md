# RESTful API Documentation
## Game & Comic Store Inventory Management System

This document outlines the RESTful API endpoints for the Game & Comic Store Inventory Management System.

## Base URL

```
https://api.gamecomicstore.com/v1
```

## Authentication

All API requests require authentication using JSON Web Tokens (JWT). Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Response Format

All responses are returned in JSON format with appropriate HTTP status codes.

Error response structure:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

## API Endpoints

### Suppliers

#### GET /suppliers
Retrieve all suppliers.

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)

**Response:**
```json
{
  "success": true,
  "suppliers": [
    {
      "_id": "6030d5c9f6e7b54f2b1e8d01",
      "name": "GameDistro Inc.",
      "contactPerson": "Robert Chen",
      "email": "sales@gamedistro.com",
      "phone": "1-800-555-1234",
      "address": {
        "street": "123 Distribution Way",
        "city": "Los Angeles",
        "state": "CA",
        "zipCode": "90001",
        "country": "USA"
      },
      "paymentTerms": "Net 30",
      "productCategories": ["6020f4b8e7f5c43d5a0f7c01", "6020f4b8e7f5c43d5a0f7c05"],
      "active": true
    }
  ],
  "total": 6
}
```

#### GET /suppliers/{id}
Retrieve a specific supplier by ID.

**Response:**
```json
{
  "success": true,
  "supplier": {
    "_id": "6030d5c9f6e7b54f2b1e8d01",
    "name": "GameDistro Inc.",
    "contactPerson": "Robert Chen",
    "email": "sales@gamedistro.com",
    "phone": "1-800-555-1234",
    "address": {
      "street": "123 Distribution Way",
      "city": "Los Angeles",
      "state": "CA",
      "zipCode": "90001",
      "country": "USA"
    },
    "paymentTerms": "Net 30",
    "productCategories": ["6020f4b8e7f5c43d5a0f7c01", "6020f4b8e7f5c43d5a0f7c05"],
    "active": true,
    "notes": "Primary supplier for video games and accessories",
    "createdAt": "2024-01-15T11:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

#### POST /suppliers
Create a new supplier.

**Request Body:**
```json
{
  "name": "New Game Supplier",
  "contactPerson": "Jane Smith",
  "email": "jane@newgamesupplier.com",
  "phone": "1-888-555-7890",
  "address": {
    "street": "456 Supplier Street",
    "city": "Chicago",
    "state": "IL",
    "zipCode": "60601",
    "country": "USA"
  },
  "paymentTerms": "Net 15",
  "productCategories": ["6020f4b8e7f5c43d5a0f7c01"],
  "active": true,
  "notes": "New supplier for indie games"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Supplier created successfully"
}
```

#### PUT /suppliers/{id}
Update an existing supplier.

**Request Body:**
```json
{
  "name": "Updated Supplier Name",
  "contactPerson": "Robert Chen Jr.",
  "email": "robert@gamedistro.com",
  "active": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Supplier updated successfully"
}
```

#### DELETE /suppliers/{id}
Delete a supplier.

**Response:**
```json
{
  "success": true,
  "message": "Supplier deleted successfully"
}
```

### Products

#### GET /products
Retrieve all products.

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 20)
- `page` (optional): Page number for pagination (default: 1)
- `sort` (optional): Field to sort by (name, price, quantity, createdAt)
- `order` (optional): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "6040c6d0e5a9c67d3f2d9e01",
      "name": "The Last Guardian 2",
      "sku": "VG-PS5-TLG2",
      "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
      "price": 69.99,
      "quantity": 25,
      "category": "6020f4b8e7f5c43d5a0f7c11",
      "supplier": {
        "_id": "6030d5c9f6e7b54f2b1e8d01",
        "name": "GameDistro Inc."
      },
      "images": [
        "thelastguardian2_cover.jpg",
        "thelastguardian2_screenshot1.jpg"
      ]
    }
  ],
  "total": 9,
  "page": 1,
  "limit": 20
}
```

#### GET /products/{id}
Retrieve a specific product by ID.

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "6040c6d0e5a9c67d3f2d9e01",
    "name": "The Last Guardian 2",
    "sku": "VG-PS5-TLG2",
    "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
    "price": 69.99,
    "cost": 42.50,
    "quantity": 25,
    "category": "6020f4b8e7f5c43d5a0f7c11",
    "supplier": {
      "_id": "6030d5c9f6e7b54f2b1e8d01",
      "name": "GameDistro Inc."
    },
    "releaseDate": "2024-11-15T00:00:00Z",
    "platform": "PlayStation 5",
    "publisher": "Sony Interactive Entertainment",
    "condition": "New",
    "isDigital": false,
    "images": [
      "thelastguardian2_cover.jpg",
      "thelastguardian2_screenshot1.jpg"
    ],
    "tags": ["adventure", "puzzle", "exclusive"],
    "ratings": {
      "average": 4.8,
      "count": 156
    },
    "location": {
      "aisle": "A",
      "shelf": "3",
      "bin": "12"
    },
    "createdAt": "2024-11-20T09:30:00Z",
    "updatedAt": "2025-03-01T14:15:00Z"
  }
}
```

#### POST /products
Create a new product.

**Request Body:**
```json
{
  "name": "New Game Title",
  "sku": "VG-PS5-NGT",
  "description": "Exciting new game release",
  "price": 59.99,
  "cost": 35.50,
  "quantity": 20,
  "category": "6020f4b8e7f5c43d5a0f7c11",
  "supplier": "6030d5c9f6e7b54f2b1e8d01",
  "platform": "PlayStation 5",
  "publisher": "Game Publisher",
  "releaseDate": "2025-04-15T00:00:00Z",
  "condition": "New",
  "isDigital": false,
  "tags": ["action", "multiplayer"],
  "location": {
    "aisle": "A",
    "shelf": "4",
    "bin": "01"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully"
}
```

#### PATCH /products/{id}
Update an existing product.

**Request Body:**
```json
{
  "price": 64.99,
  "quantity": 18,
  "description": "Updated game description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

#### DELETE /products/{id}
Delete a product.

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Expansions

#### GET /products/{productId}/expansions
Retrieve all expansions for a specific product.

**Response:**
```json
{
  "success": true,
  "expansions": [
    {
      "name": "Seafarers Expansion", 
      "sku": "BG-STR-CATAN-SEA"
    },
    {
      "name": "Cities & Knights Expansion", 
      "sku": "BG-STR-CATAN-CK"
    }
  ]
}
```

#### POST /products/{productId}/expansions
Add an expansion to a specific product.

**Request Body:**
```json
{
  "name": "Cities & Knights Expansion",
  "sku": "BG-STR-CATAN-CK"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expansion added successfully"
}
```

#### PUT /expansions/{id}
Update an existing expansion.

**Request Body:**
```json
{
  "name": "Cities & Knights Expansion - Deluxe Edition",
  "sku": "BG-STR-CATAN-CKD"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Expansion updated successfully"
}
```

#### DELETE /expansions/{id}
Delete an expansion.

**Response:**
```json
{
  "success": true,
  "message": "Expansion deleted successfully"
}
```

### Transactions

#### GET /transactions
Retrieve a list of all transactions.

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 20)
- `page` (optional): Page number for pagination (default: 1)
- `type` (optional): Filter by transaction type (sale, return)
- `date` (optional): Filter by date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "_id": "6050b7e1c4d8a98f1c3f0a01",
      "transactionType": "sale",
      "transactionNumber": "S240301-001",
      "date": "2025-03-01T10:15:23Z",
      "customer": {
        "name": "Alex Thompson",
        "email": "alex.thompson@example.com"
      },
      "items": [
        {
          "product": "6040c6d0e5a9c67d3f2d9e01",
          "name": "The Last Guardian 2",
          "quantity": 1,
          "price": 69.99,
          "subtotal": 69.99
        }
      ],
      "subtotal": 139.98,
      "taxAmount": 11.55,
      "total": 151.53
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
```

#### GET /transactions/{id}
Retrieve a specific transaction by ID.

**Response:**
```json
{
  "success": true,
  "transaction": {
    "_id": "6050b7e1c4d8a98f1c3f0a01",
    "transactionType": "sale",
    "transactionNumber": "S240301-001",
    "date": "2025-03-01T10:15:23Z",
    "customer": {
      "name": "Alex Thompson",
      "email": "alex.thompson@example.com",
      "phone": "555-123-9876",
      "membershipId": "MEM-45678"
    },
    "items": [
      {
        "product": "6040c6d0e5a9c67d3f2d9e01",
        "name": "The Last Guardian 2",
        "sku": "VG-PS5-TLG2",
        "quantity": 1,
        "price": 69.99,
        "cost": 42.50,
        "discount": 0,
        "subtotal": 69.99
      },
      {
        "product": "6040c6d0e5a9c67d3f2d9e07",
        "name": "PlayStation 5 DualSense Controller",
        "sku": "ACC-PS5-CTRL",
        "quantity": 1,
        "price": 69.99,
        "cost": 45.00,
        "discount": 0,
        "subtotal": 69.99
      }
    ],
    "paymentMethod": "credit",
    "paymentDetails": {
      "cardType": "Visa",
      "lastFour": "4321",
      "transactionId": "PYMT-8756321"
    },
    "subtotal": 139.98,
    "taxRate": 8.25,
    "taxAmount": 11.55,
    "total": 151.53,
    "profit": 64.03,
    "status": "completed",
    "notes": "Customer mentioned interest in upcoming PS5 titles",
    "createdBy": "6010e3a7d1f5b32e4c9e6b02",
    "updatedBy": "6010e3a7d1f5b32e4c9e6b02",
    "createdAt": "2025-03-01T10:15:23Z",
    "updatedAt": "2025-03-01T10:15:23Z"
  }
}
```

### Categories

#### GET /categories
Retrieve a list of all categories.

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "_id": "6020f4b8e7f5c43d5a0f7c01",
      "name": "Video Games",
      "description": "Video games for various consoles and platforms",
      "taxRate": 8.25,
      "displayOrder": 1
    },
    {
      "_id": "6020f4b8e7f5c43d5a0f7c11",
      "name": "PlayStation",
      "description": "Games for PlayStation consoles",
      "taxRate": 8.25,
      "displayOrder": 6,
      "parentCategory": "6020f4b8e7f5c43d5a0f7c01"
    }
  ]
}
```

#### GET /categories/{id}
Retrieve a specific category by ID.

**Response:**
```json
{
  "success": true,
  "category": {
    "_id": "6020f4b8e7f5c43d5a0f7c01",
    "name": "Video Games",
    "description": "Video games for various consoles and platforms",
    "taxRate": 8.25,
    "displayOrder": 1,
    "createdAt": "2024-01-10T09:00:00Z",
    "updatedAt": "2024-01-10T09:00:00Z"
  }
}
```

### Search Endpoints

#### GET /search/transactions
Search for transactions based on various criteria.

**Query Parameters:**
- `startDate` (optional): Start date for transactions (YYYY-MM-DD)
- `endDate` (optional): End date for transactions (YYYY-MM-DD)
- `category` (optional): Category ID
- `product` (optional): Product ID or SKU
- `customer` (optional): Customer name or email
- `supplier` (optional): Supplier ID
- `limit` (optional): Number of results to return (default: 20)
- `page` (optional): Page number for pagination (default: 1)

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "_id": "6050b7e1c4d8a98f1c3f0a01",
      "transactionType": "sale",
      "transactionNumber": "S240301-001",
      "date": "2025-03-01T10:15:23Z",
      "customer": {
        "name": "Alex Thompson",
        "email": "alex.thompson@example.com"
      },
      "items": [
        {
          "product": "6040c6d0e5a9c67d3f2d9e01",
          "name": "The Last Guardian 2",
          "quantity": 1,
          "subtotal": 69.99
        }
      ],
      "total": 151.53
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 20
}
```

#### GET /search/products
Search for products based on various criteria.

**Query Parameters:**
- `category` (optional): Category ID
- `name` (optional): Product name (partial match)
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `minStock` (optional): Minimum stock level
- `maxStock` (optional): Maximum stock level
- `tags` (optional): Comma-separated list of tags
- `limit` (optional): Number of results to return (default: 20)
- `page` (optional): Page number for pagination (default: 1)

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "6040c6d0e5a9c67d3f2d9e01",
      "name": "The Last Guardian 2",
      "sku": "VG-PS5-TLG2",
      "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
      "price": 69.99,
      "quantity": 25,
      "category": "6020f4b8e7f5c43d5a0f7c11",
      "images": [
        "thelastguardian2_cover.jpg"
      ],
      "tags": ["adventure", "puzzle", "exclusive"]
    }
  ],
  "total": 2,
  "page": 1,
  "limit": 20
}
```

## User Management
### Users

#### POST /users
Create a new user.

**Request Body:**
```json
{
  "username": "new_user",
  "email": "new_user@example.com",
  "fullName": "New User",
  "role": "staff",
  "password": "securepassword",
  "contactInfo": {
    "phone": "555-678-1234",
    "address": "123 New St, New City"
  },
  "permissions": ["inventory_read", "sales_create", "reports_read"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

#### POST /auth/login
Log in as a user and get a JWT.

**Request Body:**
```json
{
  "username": "existing_user",
  "password": "userpassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

#### PUT /users/{id}
Update an existing user.

**Request Body:**
```json
{
  "email": "updated_user@example.com",
  "fullName": "Updated User",
  "role": "manager",
  "password":"asd1234",
  "contactInfo": {
    "phone": "555-987-6543",
    "address": "456 Updated St, Updated City"
  },
  "permissions": ["inventory_full", "sales_full", "reports_full", "user_management"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully"
}
```

### User Fields

| Field         | Type     | Description                                      |
|---------------|----------|--------------------------------------------------|
| `username`    | String   | Unique username for the user                     |
| `email`       | String   | Email address of the user                        |
| `fullName`    | String   | Full name of the user                            |
| `role`        | String   | Role of the user (e.g., `manager`, `staff`)      |
| `password`    | String   | Password for the user (only for creation)        |
| `contactInfo` | Object   | Contact information of the user                  |
| `contactInfo.phone`       | String   | Phone number of the user                         |
| `contactInfo.address`     | String   | Address of the user                              |
| `permissions` | Array    | List of permissions assigned to the user         |


**Permissions:**

| Permission          | Description                                      |
|---------------------|--------------------------------------------------|
| `inventory_full`    | Full access to inventory management              |
| `inventory_read`    | Read-only access to inventory                    |
| `sales_full`        | Full access to sales management                  |
| `sales_create`      | Ability to create sales                          |
| `reports_full`      | Full access to reports                           |
| `reports_read`      | Read-only access to reports                      |
| `user_management`   | Ability to manage users                          |


## Error Codes

| Code | Description |
|------|-------------|
| `AUTH_REQUIRED` | Authentication is required |
| `INVALID_TOKEN` | Invalid or expired token |
| `NOT_FOUND` | Requested resource not found |
| `BAD_REQUEST` | Invalid request parameters |
| `DUPLICATE_ENTRY` | Resource already exists (e.g., duplicate SKU) |
| `VALIDATION_ERROR` | Request validation failed |
| `INTERNAL_ERROR` | Server error |
| `FORBIDDEN` | User lacks permission for the action |

## Rate Limiting

The API implements rate limiting to prevent abuse. Limits are:
- 100 requests per minute for authenticated users
- 10 requests per minute for unauthenticated requests

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum number of requests allowed
- `X-RateLimit-Remaining`: Number of requests remaining
- `X-RateLimit-Reset`: Time in seconds until the rate limit resets

## Versioning

The API uses URL versioning (v1). Future versions may introduce breaking changes and will be accessed via a different version identifier.