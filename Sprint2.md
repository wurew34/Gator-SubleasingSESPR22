# Sprint 2:

## REST API Documentation

The Postman commands and sample examples can be viewed here : [https://documenter.getpostman.com/view/10332145/UVkvHsNy](https://documenter.getpostman.com/view/10332145/UVkvHsNy)

### User Endpoints

### 1. Register User:

##### Request

Method: `POST`

##### Target URL: `'http://localhost:8080/api/users/signup'`

##### Example:

Sample Body:

```json
{
  "first_name": "Munish",
  "last_name": "Tanwar",
  "email": "munish@gmail.com",
  "password": "thisisapassword"
}
```

Sample Response :

```json
{
  "InsertedID": "6222a40efbc8be0ff18558aa"
}
```

### 2. Login User:

##### Request

Method: `POST`

##### Target URL: `'http://localhost:8080/api/users/login'`

##### Example:

Sample Body:

```json
{
  "email": "munish@gmail.com",
  "password": "thisisapassword"
}
```

Sample Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdF9uYW1lIjoiTXVuaXNoIiwiTGFzdF9uYW1lIjoiVGFud2FyIiwiRW1haWwiOiJtdW5pc2hAZ21haWwuY29tIiwiVWlkIjoiNjIyMmE0MGVmYmM4YmUwZmYxODU1OGFhIiwiZXhwIjoxNjQ2NTIzODk2fQ.61MoXjHKD7w2ze5_EgJnFh_6LtwDTKKgDPGDR85So_U"
}
```

### 3. Get User:

##### Request

Method: `GET`

##### Target URL: `'http://localhost:8080/api/user'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: N/A

Sample Response

```json
{
  "_id": "6222a40efbc8be0ff18558aa",
  "first_name": "Munish",
  "last_name": "Tanwar",
  "email": "munish@gmail.com",
  "password": "$2a$14$6c00OALGNCfeOYWKObaIh.B2g0vGkAG5/tdqHhngXygaqUmXT5Tna",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdF9uYW1lIjoiTXVuaXNoIiwiTGFzdF9uYW1lIjoiVGFud2FyIiwiRW1haWwiOiJtdW5pc2hAZ21haWwuY29tIiwiVWlkIjoiNjIyMmE0MGVmYmM4YmUwZmYxODU1OGFhIiwiZXhwIjoxNjQ2NTIzODk2fQ.61MoXjHKD7w2ze5_EgJnFh_6LtwDTKKgDPGDR85So_U",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdF9uYW1lIjoiIiwiTGFzdF9uYW1lIjoiIiwiRW1haWwiOiIiLCJVaWQiOiIiLCJleHAiOjE2NDcwNDIyOTZ9.SkEeUkhPW2nc3aBybgjCIkP-WPVTJ5PIQAG1GPWp1As",
  "created_at": "2022-03-04T23:43:10Z",
  "updated_at": "2022-03-04T23:44:56Z",
  "user_id": "6222a40efbc8be0ff18558aa"
}
```

### Lease Endpoints

### 1. Create Lease:

##### Request

Method: `POST`

##### Target URL: `'http://localhost:8080/api/lease/create'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body:

```json
{
  "bedrooms": 4,
  "bathrooms": 4,
  "description": "Near Walmart",
  "title": "Niche",
  "price": 584.0,
  "term": 15
}
```

Sample Response

```json
{
  "_id": "6222a4d9fbc8be0ff18558ab",
  "lease_id": "6222a4d9fbc8be0ff18558ab",
  "title": "Niche",
  "bedrooms": 4,
  "bathrooms": 4,
  "description": "Near Walmart",
  "price": 584,
  "term": 15,
  "created_at": "2022-03-04T18:46:33.9983003-05:00",
  "updated_at": "2022-03-04T18:46:33.9983003-05:00"
}
```

### 2. Get Leases:

##### Request

Method: `GET`

##### Target URL: `'http://localhost:8080/api/lease?page=1'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: N/A

Sample Response

```json
{
  "last_page": 1,
  "leases": [
    {
      "_id": "62098f908328bdf9b95b55ae",
      "user_id": "61fdc48d079c119e946e9df0",
      "bedrooms": 1,
      "bathrooms": 1,
      "description": "Near Enclave",
      "price": 123.9,
      "term": 1,
      "created_at": "2022-02-13T23:09:04.265Z",
      "updated_at": "2022-02-13T23:09:04.265Z"
    },
    {
      "_id": "62098f9e8328bdf9b95b55af",
      "user_id": "61fdc48d079c119e946e9df0",
      "bedrooms": 1,
      "bathrooms": 1,
      "description": "Gainesville Place",
      "price": 13.9,
      "term": 1,
      "created_at": "2022-02-13T23:09:18.088Z",
      "updated_at": "2022-02-13T23:09:18.088Z"
    },
    {
      "_id": "620990b1484be82e4e313b3a",
      "user_id": "61fdc48d079c119e946e9df0",
      "bedrooms": 1,
      "bathrooms": 1,
      "description": "Gainesville Place",
      "price": 13.9,
      "term": 1,
      "created_at": "2022-02-13T23:13:53.578Z",
      "updated_at": "2022-02-13T23:13:53.578Z"
    },
    {
      "_id": "620b4175b350d31606b5c68a",
      "user_id": "61fdc48d079c119e946e9df0",
      "lease_id": "620b4175b350d31606b5c68a",
      "bedrooms": 2,
      "bathrooms": 2,
      "description": "Hideaway",
      "price": 550,
      "term": 13,
      "created_at": "0001-01-01T00:00:00Z",
      "updated_at": "2022-02-15T06:05:55.579Z"
    },
    {
      "_id": "621fdc14ad61251c561117bf",
      "user_id": "61fdc48d079c119e946e9df0",
      "lease_id": "621fdc14ad61251c561117bf",
      "title": "Hideaway",
      "bedrooms": 1,
      "bathrooms": 1,
      "description": "Used to be Campus Lodge",
      "price": 484,
      "term": 15,
      "created_at": "2022-03-02T21:05:24.609Z",
      "updated_at": "2022-03-02T21:05:24.609Z"
    },
    {
      "_id": "621fe106884dc4b2a6ea27ec",
      "user_id": "61fdc48d079c119e946e9df0",
      "lease_id": "621fe106884dc4b2a6ea27ec",
      "title": "University Commons",
      "bedrooms": 4,
      "bathrooms": 2,
      "description": "University Commons share bathrooms",
      "price": 484,
      "term": 15,
      "created_at": "2022-03-02T21:26:30.227Z",
      "updated_at": "2022-03-02T21:26:30.227Z"
    },
    {
      "_id": "62200d43c8b1227ab7eaacb6",
      "user_id": "61fdc48d079c119e946e9df0",
      "lease_id": "62200d43c8b1227ab7eaacb6",
      "title": "Niche",
      "bedrooms": 4,
      "bathrooms": 4,
      "description": "Near Walmart",
      "price": 584,
      "term": 15,
      "created_at": "2022-03-03T00:35:15.598Z",
      "updated_at": "2022-03-03T00:35:15.598Z"
    },
    {
      "_id": "6222a4d9fbc8be0ff18558ab",
      "lease_id": "6222a4d9fbc8be0ff18558ab",
      "title": "Niche",
      "bedrooms": 4,
      "bathrooms": 4,
      "description": "Near Walmart",
      "price": 584,
      "term": 15,
      "created_at": "2022-03-04T23:46:33.998Z",
      "updated_at": "2022-03-04T23:46:33.998Z"
    }
  ],
  "limit": 10,
  "page": 1,
  "total": 8
}
```

### 3. Get Lease By ID:

##### Request

Method: `GET`

##### Target URL: `'http://localhost:8080/api/lease/6222a4d9fbc8be0ff18558ab'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: N/A

Sample Response

```json
{
  "_id": "6222a4d9fbc8be0ff18558ab",
  "lease_id": "6222a4d9fbc8be0ff18558ab",
  "title": "Niche",
  "bedrooms": 4,
  "bathrooms": 4,
  "description": "Near Walmart",
  "price": 584,
  "term": 15,
  "created_at": "2022-03-04T23:46:33.998Z",
  "updated_at": "2022-03-04T23:46:33.998Z"
}
```

### 4. Update Lease:

##### Request

Method: `PUT`

##### Target URL: `'http://localhost:8080/api/lease/6222a4d9fbc8be0ff18558ab'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body:

```json
{
  "_id": "6222a4d9fbc8be0ff18558ab",
  "lease_id": "6222a4d9fbc8be0ff18558ab",
  "title": "Niche",
  "bedrooms": 4,
  "bathrooms": 4,
  "description": "Near Walmart",
  "price": 600,
  "term": 6,
  "created_at": "2022-03-04T18:46:33.9983003-05:00",
  "updated_at": "2022-03-04T18:46:33.9983003-05:00"
}
```

Sample Response

```json
{
  "_id": "6222a4d9fbc8be0ff18558ab",
  "lease_id": "6222a4d9fbc8be0ff18558ab",
  "title": "Niche",
  "bedrooms": 4,
  "bathrooms": 4,
  "description": "Near Walmart",
  "price": 600,
  "term": 6,
  "created_at": "2022-03-04T18:46:33.9983003-05:00",
  "updated_at": "2022-03-04T18:49:30.37635-05:00"
}
```

### 5. Delete Lease By ID:

##### Request

Method: `DELETE`

##### Target URL: `'http://localhost:8080/api/lease/6222a4d9fbc8be0ff18558ab'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: NA

Sample Response

```json
{
  "message": "lease deleted"
}
```
# Unit Testing For Backend

1. `go test -run ^TestMain`

# Front-End e2e and Unit Testing Documentation

1. Included unit testing for sign-in and sign-up functionalities using Jest.
2. Included Cypress e2e testing for landing page, login, signup, and dashboard components.

## Testing Landing Page

![chrome_abrP7oCN6a](https://user-images.githubusercontent.com/45046355/156868418-2e7f282d-976c-41eb-b46a-a8141dfe6813.png)

## Testing Sign In

![chrome_197Zi2XKYP](https://user-images.githubusercontent.com/45046355/156868410-a1f37db3-b2a5-49c5-a133-21ab217342a6.png)

## Testing Sign Up

![chrome_EeRauvXgon](https://user-images.githubusercontent.com/45046355/156868372-55c4d63e-aed3-4cc7-8030-ca36af5fcf22.png)

## Testing Dashboard

![IAFcD0vfZ4](https://user-images.githubusercontent.com/45046355/156868504-03b39d68-d597-409d-9a4b-65dd7102328d.gif)

# Setup and running test scripts:

- Jest unit testing: **npm test**

- Cypress e2e testing: **npm run e2e**
