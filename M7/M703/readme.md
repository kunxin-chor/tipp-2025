# RESTful API Documentation
## Game & Comic Store Inventory Management System

This document outlines the RESTful API endpoints for the Game & Comic Store Inventory Management System. The API provides interfaces for managing suppliers, products, expansions, transactions, and categories.

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

Standard response structure:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

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
Retrieve a list of all suppliers.

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)

**Response:**
```json
{
  "success": true   
}
```

#### GET /suppliers/{id}
Retrieve a specific supplier by ID.

**Response:**
```json
{
  "success": true
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
  "success": true 
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
  "success": true 
}
```

#### DELETE /suppliers/{id}
Delete a supplier.

**Response:**
```json
{
  "success": true
}
```

### Products

#### GET /products
Retrieve a list of all products.

**Query Parameters:**
- `limit` (optional): Number of results to return (default: 20)
- `page` (optional): Page number for pagination (default: 1)
- `sort` (optional): Field to sort by (name, price, quantity, createdAt)
- `order` (optional): Sort order (asc, desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "6040c6d0e5a9c67d3f2d9e01",
        "name": "The Last Guardian 2",
        "sku": "VG-PS5-TLG2",
        "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
        "price": 69.99,
        "quantity": 25,
        "category": "6020f4b8e7f5c43d5a0f7c01",
        "subcategory": "6020f4b8e7f5c43d5a0f7c11",
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
}
```

#### GET /products/{id}
Retrieve a specific product by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "_id": "6040c6d0e5a9c67d3f2d9e01",
      "name": "The Last Guardian 2",
      "sku": "VG-PS5-TLG2",
      "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
      "price": 69.99,
      "cost": 42.50,
      "quantity": 25,
      "category": "6020f4b8e7f5c43d5a0f7c01",
      "subcategory": "6020f4b8e7f5c43d5a0f7c11",
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
}
```

#### POST /products
Create a new product.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Product name |
| `sku` | string | Yes | Stock keeping unit (unique identifier) |
| `description` | string | Yes | Product description |
| `price` | number | Yes | Retail price |
| `cost` | number | Yes | Wholesale cost |
| `quantity` | number | Yes | Inventory quantity |
| `category` | string | Yes | Category ID |
| `subcategory` | string | Yes | Subcategory ID |
| `supplier` | string | Yes | Supplier ID |
| `platform` | string | No | Gaming platform (for video games) |
| `publisher` | string | No | Publisher name |
| `author` | string | No | Author name (for books/comics) |
| `releaseDate` | string | No | Release date (ISO format) |
| `condition` | string | No | Product condition (New, Used, etc.) |
| `isDigital` | boolean | No | Whether product is digital or physical |
| `tags` | array of strings | No | Product tags for categorization |
| `images` | array of strings | No | Image filenames/URLs |
| `location` | object | No | Physical store location |
| `location.aisle` | string | No | Store aisle identifier |
| `location.shelf` | string | No | Shelf identifier |
| `location.bin` | string | No | Bin identifier |

**Example Request Body:**
```json
{
  "name": "New Game Title",
  "sku": "VG-PS5-NGT",
  "description": "Exciting new game release",
  "price": 59.99,
  "cost": 35.50,
  "quantity": 20,
  "category": "6020f4b8e7f5c43d5a0f7c01",
  "subcategory": "6020f4b8e7f5c43d5a0f7c11",
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
  "success": true
 
}
```

#### PUT /products/{id}
Update an existing product.

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Product name |
| `sku` | string | No | Stock keeping unit (unique identifier) |
| `description` | string | No | Product description |
| `price` | number | No | Retail price |
| `cost` | number | No | Wholesale cost |
| `quantity` | number | No | Inventory quantity |
| `category` | string | No | Category ID |
| `subcategory` | string | No | Subcategory ID |
| `supplier` | string | No | Supplier ID |
| `platform` | string | No | Gaming platform (for video games) |
| `publisher` | string | No | Publisher name |
| `author` | string | No | Author name (for books/comics) |
| `releaseDate` | string | No | Release date (ISO format) |
| `condition` | string | No | Product condition (New, Used, etc.) |
| `isDigital` | boolean | No | Whether product is digital or physical |
| `tags` | array of strings | No | Product tags for categorization |
| `images` | array of strings | No | Image filenames/URLs |
| `location` | object | No | Physical store location |
| `location.aisle` | string | No | Store aisle identifier |
| `location.shelf` | string | No | Shelf identifier |
| `location.bin` | string | No | Bin identifier |

**Example Request Body:**
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
  "success": true 
}
```

#### DELETE /products/{id}
Delete a product.

**Response:**
```json
{
  "success": true 
}
```

### Expansions

#### GET /products/{productId}/expansions
Retrieve all expansions for a specific product.

**Response:**
```json
{
  "success": true
 
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
  "success": true

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
  "success": true
 
}
```

#### DELETE /expansions/{id}
Delete an expansion.

**Response:**
```json
{
  "success": true
 
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
  "data": {
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
}
```

#### GET /transactions/{id}
Retrieve a specific transaction by ID.

**Response:**
```json
{
  "success": true,
  "data": {
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
}
```

### Categories

#### GET /categories
Retrieve a list of all categories.

**Response:**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "_id": "6020f4b8e7f5c43d5a0f7c01",
        "name": "Video Games",
        "description": "Video games for various consoles and platforms",
        "subcategories": [
          {
            "_id": "6020f4b8e7f5c43d5a0f7c11",
            "name": "PlayStation",
            "description": "Games for PlayStation consoles"
          },
          {
            "_id": "6020f4b8e7f5c43d5a0f7c12",
            "name": "Xbox",
            "description": "Games for Xbox consoles"
          },
          {
            "_id": "6020f4b8e7f5c43d5a0f7c13",
            "name": "Nintendo",
            "description": "Games for Nintendo consoles"
          },
          {
            "_id": "6020f4b8e7f5c43d5a0f7c14",
            "name": "PC",
            "description": "Games for PC platform"
          }
        ],
        "taxRate": 8.25,
        "displayOrder": 1
      }
    ]
  }
}
```

#### GET /categories/{id}
Retrieve a specific category by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "category": {
      "_id": "6020f4b8e7f5c43d5a0f7c01",
      "name": "Video Games",
      "description": "Video games for various consoles and platforms",
      "subcategories": [
        {
          "_id": "6020f4b8e7f5c43d5a0f7c11",
          "name": "PlayStation",
          "description": "Games for PlayStation consoles"
        },
        {
          "_id": "6020f4b8e7f5c43d5a0f7c12",
          "name": "Xbox",
          "description": "Games for Xbox consoles"
        },
        {
          "_id": "6020f4b8e7f5c43d5a0f7c13",
          "name": "Nintendo",
          "description": "Games for Nintendo consoles"
        },
        {
          "_id": "6020f4b8e7f5c43d5a0f7c14",
          "name": "PC",
          "description": "Games for PC platform"
        }
      ],
      "taxRate": 8.25,
      "displayOrder": 1,
      "createdAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-10T09:00:00Z"
    }
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
  "data": {
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
}
```

#### GET /search/products
Search for products based on various criteria.

**Query Parameters:**
- `category` (optional): Category ID
- `subcategory` (optional): Subcategory ID
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
  "data": {
    "products": [
      {
        "_id": "6040c6d0e5a9c67d3f2d9e01",
        "name": "The Last Guardian 2",
        "sku": "VG-PS5-TLG2",
        "description": "Sequel to the acclaimed adventure game featuring a boy and a mythical creature",
        "price": 69.99,
        "quantity": 25,
        "category": "6020f4b8e7f5c43d5a0f7c01",
        "subcategory": "6020f4b8e7f5c43d5a0f7c11",
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
}
```

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