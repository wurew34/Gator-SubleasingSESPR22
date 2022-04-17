# Sprint 3:

## Tasks for Sprint 3:

### Backend Tasks:

- Finish implementing pagination, sorting, filtering, and serach for the /GetLease endpoint.
- Implement geocoding to convert addresses to coordinates using Google Maps API for the /CreateLease and /UpdateLease endpoints.
- Add a new endpoint, /SearchLease to provide a list of all the lease title which will be used for autocomplete functionality in the front-end.
- Implememnt Unit Tests for all the backend enpoints.
- API Testing using Postman.

### Front-End Tasks:

- Finished dashboard implementation of search bar, sorting, and create listing.
- Implementation of correct API routes to specified listings.
- Added auto-complete functionality to the existing search bar for ease of use.
- Included Jest unit testing for create listing and dashboard features.
- Included Cypress e2e testing for create listing, search bar, sorting, and app bar usage.

## Backend:

### Steps to run backend:

- Run `go run main.go` in server folder.

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

API Test in Postman:
![Postman_MHoKEiMynF](https://user-images.githubusercontent.com/59619342/161340662-66d6d63d-eec9-4fb4-b853-a6ca9fb27c07.png)

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

API Test in Postman:
![Postman_ymx0ZVFUw9](https://user-images.githubusercontent.com/59619342/161340769-40b32c5f-dfff-4478-85f1-3e20c6a0e228.png)

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

API Test in Postman:
![Postman_2SIRSswsuZ](https://user-images.githubusercontent.com/59619342/161340983-48568371-1d0b-4616-8eb0-bcacea2d04e3.png)

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
  "description": "At Archer",
  "title": "University Club",
  "Address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "price": 584.0,
  "term": 15
}
```

Sample Response

```json
{
  "_id": "6247694f023fda606f312a2a",
  "user_id": "624767d1023fda606f312a29",
  "lease_id": "6247694f023fda606f312a2a",
  "title": "University Club",
  "description": "At Archer",
  "price": 584,
  "term": 15,
  "bedrooms": 4,
  "bathrooms": 4,
  "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "location": {
    "type": "Point",
    "coordinates": [-82.35758059999999, 29.625695]
  },
  "created_at": "2022-04-01T17:06:24.2489983-04:00",
  "updated_at": "2022-04-01T17:06:24.2489983-04:00"
}
```

API Test in Postman:
![Postman_gMKzAgTJgH](https://user-images.githubusercontent.com/59619342/161341520-c2d16530-eebe-47d1-898f-9b06beee5e47.png)

### 2. Get Leases:

##### Request

Method: `GET`

##### Target URL: `http://localhost:8080/api/lease?page=1&limit=5&s=university&sort=price_asc&bed=2`

##### Parameters:

| Parameter | Description                              |
| --------- | ---------------------------------------- |
| s         | Search leases by title                   |
| page      | Page Number                              |
| limit     | Number of leases per page                |
| sort      | Sort by price, term, bedrooms, bathrooms |
| bed       | Bedrooms number filter                   |
| bath      | Bathrooms number filter                  |

##### Example:

Sample Body:
| Parameter | Value |
| ---------- | ------ |
| s | university|
| page | 1 |
| limit | 5|
| sort | price_asc|
| bed | 2|

Sample Response

```json
{
  "last_page": 2,
  "leases": [
    {
      "_id": "621fe106884dc4b2a6ea27ec",
      "user_id": "61fdc48d079c119e946e9df0",
      "lease_id": "621fe106884dc4b2a6ea27ec",
      "title": "University Commons",
      "description": "University Commons share bathrooms",
      "price": 484,
      "term": 15,
      "bedrooms": 4,
      "bathrooms": 2,
      "address": "\"2601 SW Archer Rd, Gainesville, FL 32608\"",
      "location": {
        "type": "Point",
        "coordinates": [29.6300866, -82.3625437]
      },
      "created_at": "2022-03-02T21:26:30.227Z",
      "updated_at": "2022-03-02T21:26:30.227Z"
    },
    {
      "_id": "62437dcfb36c379bd76aa785",
      "user_id": "6222a40efbc8be0ff18558aa",
      "lease_id": "62437dcfb36c379bd76aa785",
      "title": "University Commons",
      "description": "At Archer",
      "price": 584,
      "term": 15,
      "bedrooms": 4,
      "bathrooms": 4,
      "address": "2601 SW Archer Rd, Gainesville, FL 32608",
      "location": {
        "type": "Point",
        "coordinates": [29.6300866, -82.3625437]
      },
      "created_at": "2022-03-29T21:44:47.475Z",
      "updated_at": "2022-03-29T21:44:47.475Z"
    },
    {
      "_id": "624382dc0121140be547459a",
      "user_id": "6222a40efbc8be0ff18558aa",
      "lease_id": "624382dc0121140be547459a",
      "title": "University Club",
      "description": "At Archer",
      "price": 584,
      "term": 15,
      "bedrooms": 4,
      "bathrooms": 4,
      "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
      "location": {
        "type": "Point",
        "coordinates": [29.625695, -82.35758059999999]
      },
      "created_at": "2022-03-29T22:06:20.433Z",
      "updated_at": "2022-03-29T22:06:20.433Z"
    },
    {
      "_id": "6247694f023fda606f312a2a",
      "user_id": "624767d1023fda606f312a29",
      "lease_id": "6247694f023fda606f312a2a",
      "title": "University Club",
      "description": "At Archer",
      "price": 584,
      "term": 15,
      "bedrooms": 4,
      "bathrooms": 4,
      "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
      "location": {
        "type": "Point",
        "coordinates": [-82.35758059999999, 29.625695]
      },
      "created_at": "2022-04-01T21:06:24.248Z",
      "updated_at": "2022-04-01T21:06:24.248Z"
    },
    {
      "_id": "62437e20b36c379bd76aa786",
      "user_id": "6222a40efbc8be0ff18558aa",
      "lease_id": "62437e20b36c379bd76aa786",
      "title": "University Club",
      "description": "At Archer",
      "price": 584,
      "term": 15,
      "bedrooms": 4,
      "bathrooms": 4,
      "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
      "location": {
        "type": "Point",
        "coordinates": [29.625695, -82.35758059999999]
      },
      "created_at": "2022-03-29T21:46:08.755Z",
      "updated_at": "2022-03-29T21:46:08.755Z"
    }
  ],
  "limit": 5,
  "page": 1,
  "total": 6
}
```

API Test in Postman:
![Postman_VFTd1i8OuT](https://user-images.githubusercontent.com/59619342/161347832-c3a6fd80-4e3f-4cd4-91e4-767a369efc71.png)

### 3. Get Lease By ID:

##### Request

Method: `GET`

##### Target URL: `'http://localhost:8080/api/lease/6247694f023fda606f312a2a'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: N/A

Sample Response

```json
{
  "_id": "6247694f023fda606f312a2a",
  "user_id": "624767d1023fda606f312a29",
  "lease_id": "6247694f023fda606f312a2a",
  "title": "University Club",
  "description": "At Archer",
  "price": 584,
  "term": 15,
  "bedrooms": 4,
  "bathrooms": 4,
  "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "location": {
    "type": "Point",
    "coordinates": [-82.35758059999999, 29.625695]
  },
  "created_at": "2022-04-01T21:06:24.248Z",
  "updated_at": "2022-04-01T21:06:24.248Z"
}
```

API Test in Postman:
![Postman_gcZzry5dso](https://user-images.githubusercontent.com/59619342/161341778-1d1a348c-be8d-4109-bc48-5819821a0388.png)

### 4. Get All Leases:

##### Request

Method: `GET`

##### Target URL: `http://localhost:8080/api/all_leases`

##### Example:

Sample Body: N/A

Sample Response

```json
{
        "_id": "620b4175b350d31606b5c68a",
        "bathrooms": 2,
        "bedrooms": 2,
        "created_at": "0000-12-31T19:00:00-05:00",
        "description": "Hideaway",
        "lease_id": "620b4175b350d31606b5c68a",
        "price": 550,
        "term": 13,
        "title": "Campus Lodge",
        "updated_at": "2022-02-15T01:05:55.579-05:00",
        "user_id": "61fdc48d079c119e946e9df0"
    },
    {
        "_id": "621fdc14ad61251c561117bf",
        "bathrooms": 1,
        "bedrooms": 1,
        "created_at": "2022-03-02T16:05:24.609-05:00",
        "description": "Used to be Campus Lodge",
        "images": null,
        "lease_id": "621fdc14ad61251c561117bf",
        "price": 484,
        "term": 15,
        "title": "Hideaway",
        "updated_at": "2022-03-02T16:05:24.609-05:00",
        "user_id": "61fdc48d079c119e946e9df0"
    },
    {
        "_id": "621fe106884dc4b2a6ea27ec",
        "address": "\"2601 SW Archer Rd, Gainesville, FL 32608\"",
        "bathrooms": 2,
        "bedrooms": 4,
        "created_at": "2022-03-02T16:26:30.227-05:00",
        "description": "University Commons share bathrooms",
        "images": null,
        "lease_id": "621fe106884dc4b2a6ea27ec",
        "location": {
            "coordinates": [
                29.6300866,
                -82.3625437
            ],
            "type": "Point"
        },
        "price": 484,
        "term": 15,
        "title": "University Commons",
        "updated_at": "2022-03-02T16:26:30.227-05:00",
        "user_id": "61fdc48d079c119e946e9df0"
    },
    {
        "_id": "62200d43c8b1227ab7eaacb6",
        "bathrooms": 4,
        "bedrooms": 4,
        "created_at": "2022-03-02T19:35:15.598-05:00",
        "description": "Near Walmart",
        "images": null,
        "lease_id": "62200d43c8b1227ab7eaacb6",
        "price": 584,
        "term": 15,
        "title": "Niche",
        "updated_at": "2022-03-02T19:35:15.598-05:00",
        "user_id": "61fdc48d079c119e946e9df0"
    },
    {
        "_id": "6243777706cdd4a044a89f51",
        "address": "1015 NW 21st Ave, Gainesville, FL 32609",
        "bathrooms": 4,
        "bedrooms": 4,
        "created_at": "2022-03-29T17:17:43.533-04:00",
        "description": "Near Walgreens",
        "images": null,
        "lease_id": "6243777706cdd4a044a89f51",
        "location": {
            "coordinates": [
                29.6715327,
                -82.3365981
            ],
            "type": "Point"
        },
        "price": 584,
        "term": 15,
        "title": "Lux 13",
        "updated_at": "2022-03-29T17:17:43.533-04:00",
        "user_id": "6222a40efbc8be0ff18558aa"
    },
    {
        "_id": "62437dcfb36c379bd76aa785",
        "address": "2601 SW Archer Rd, Gainesville, FL 32608",
        "bathrooms": 4,
        "bedrooms": 4,
        "created_at": "2022-03-29T17:44:47.475-04:00",
        "description": "At Archer",
        "images": null,
        "lease_id": "62437dcfb36c379bd76aa785",
        "location": {
            "coordinates": [
                29.6300866,
                -82.3625437
            ],
            "type": "Point"
        },
        "price": 584,
        "term": 15,
        "title": "University Commons",
        "updated_at": "2022-03-29T17:44:47.475-04:00",
        "user_id": "6222a40efbc8be0ff18558aa"
    },
    {
        "_id": "62437e20b36c379bd76aa786",
        "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
        "bathrooms": 4,
        "bedrooms": 4,
        "created_at": "2022-03-29T17:46:08.755-04:00",
        "description": "At Archer",
        "images": null,
        "lease_id": "62437e20b36c379bd76aa786",
        "location": {
            "coordinates": [
                29.625695,
                -82.35758059999999
            ],
            "type": "Point"
        },
        "price": 584,
        "term": 15,
        "title": "University Club",
        "updated_at": "2022-03-29T17:46:08.755-04:00",
        "user_id": "6222a40efbc8be0ff18558aa"
    },
    ......

```

API Test in Postman:
![Postman_KAPyZBIvzp](https://user-images.githubusercontent.com/59619342/161351278-3b033cae-809d-484b-820a-48514fb17b17.png)

### 5. Get Lease titles for auto-complete search:

##### Request

Method: `GET`

##### Target URL: `http://localhost:8080/api/search_lease`

##### Example:

Sample Body: N/A

Sample Response

```json
{
  "_id": "6247694f023fda606f312a2a",
  "user_id": "624767d1023fda606f312a29",
  "lease_id": "6247694f023fda606f312a2a",
  "title": "University Club",
  "description": "At Archer",
  "price": 584,
  "term": 15,
  "bedrooms": 4,
  "bathrooms": 4,
  "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "location": {
    "type": "Point",
    "coordinates": [-82.35758059999999, 29.625695]
  },
  "created_at": "2022-04-01T21:06:24.248Z",
  "updated_at": "2022-04-01T21:06:24.248Z"
}
```

API Test in Postman:
![Postman_8YOoUmYzfC](https://user-images.githubusercontent.com/59619342/161351470-f91de77b-13ba-4c50-bba4-dead5cf216be.png)

### 6. Update Lease:

##### Request

Method: `PUT`

##### Target URL: `'http://localhost:8080/api/lease/6222a4d9fbc8be0ff18558ab'`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body:

```json
{
  "_id": "6247694f023fda606f312a2a",
  "user_id": "624767d1023fda606f312a29",
  "lease_id": "6247694f023fda606f312a2a",
  "title": "University Club",
  "description": "At Archer",
  "price": 700,
  "term": 15,
  "bedrooms": 4,
  "bathrooms": 4,
  "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "location": {
    "type": "Point",
    "coordinates": [-82.35758059999999, 29.625695]
  }
}
```

Sample Response

```json
{
  "_id": "6247694f023fda606f312a2a",
  "user_id": "624767d1023fda606f312a29",
  "lease_id": "6247694f023fda606f312a2a",
  "title": "University Club",
  "description": "At Archer",
  "price": 700,
  "term": 15,
  "bedrooms": 4,
  "bathrooms": 4,
  "address": "2900 SW 23rd Terrace, Gainesville, FL 32608",
  "location": {
    "type": "Point",
    "coordinates": [-82.35758059999999, 29.625695]
  },
  "created_at": "0001-01-01T00:00:00Z",
  "updated_at": "2022-04-01T19:01:34.1773262-04:00"
}
```

API Test in Postman:
![Postman_XPpBdNAKVJ](https://user-images.githubusercontent.com/59619342/161353058-ce8308d7-0367-4cb9-92c7-20e519a613bb.png)

### 7. Delete Lease By ID:

##### Request

Method: `DELETE`

##### Target URL: `http://localhost:8080/api/lease/6247694f023fda606f312a2a`

##### Header: `Authorization: Bearer {token}`

##### Example:

Sample Body: NA

Sample Response

```json
{
  "message": "lease deleted"
}
```

API Test in Postman:
![Postman_hnhHp6llca](https://user-images.githubusercontent.com/59619342/161353369-06215ab1-874c-46c9-b430-cabdc3de689e.png)

# Unit Testing For Backend

### Setup:

- Run `go test -v -run TestMain` in server folder
- ![gwSggA2SGX](https://user-images.githubusercontent.com/59619342/161353702-3a9565d9-875c-4bb7-8247-517f8653ac2a.gif)

# Front-End

## User Stories for Front-end features:

- As a user, I wish to concisely query a sublease so that I can view potential sublease offers based on my preferences.
- As a developer, I wish to implement an auto-complete function in the search bar so users have an easier time search for properties that they wish to sublease.
- As a user, I wish to create listings for properties I wish to sublease on this platform so that other users can view and contact me for it.
- As a user, I wish to view the location of the properties so I can effectively determine which ones to sublease.

## Dashboard

![chrome_AMNhoOpNdK](https://user-images.githubusercontent.com/45046355/161341308-f89dd17f-f302-469d-b32b-36823ccb78fe.png)

## Testing Listings Page

![wfs2bNwfjA](https://user-images.githubusercontent.com/45046355/161357446-aaa0f6b5-1892-4c5a-85bf-82e0ee6d809b.gif)

## Testing Search Bar

![12spej4iJm](https://user-images.githubusercontent.com/45046355/161341456-a06f618d-7e8e-46f2-88b0-5d154475016d.gif)

## Testing Create Listing

![fOHRXB1eip](https://user-images.githubusercontent.com/45046355/161343363-ebd437af-e1cc-4510-b101-b7ee6af5ac9b.gif)

## Testing Sorting/Filtering

![XoTMdrIxaw](https://user-images.githubusercontent.com/45046355/161343556-eab7b0cc-f24a-40e2-95e7-f0e88af62b12.gif)

## Testing Pagination

![THhk78YPWq](https://user-images.githubusercontent.com/45046355/161343692-c9921a68-9ea7-44a9-b8b8-873061a47f4c.gif)

## Testing using Cypress:

The following test cases display snapshots of the search bar autocomplete, sorting/filtering, and create listings features utilizing Cypress:

![chrome_VTtDrPJSN4](https://user-images.githubusercontent.com/45046355/161344932-fb5714a9-41a9-4592-aa81-6e75e1e9758a.png)

![chrome_uJ4njkNpDG](https://user-images.githubusercontent.com/45046355/161344978-c4fe76b6-2fd9-4ba7-8711-09a6f6ed8217.png)

![chrome_EBhRhoZSB0](https://user-images.githubusercontent.com/45046355/161344896-858c7559-390c-4cc7-976a-96e3d0306474.png)

# Setup and running test scripts:

- Jest unit testing: **npm test**

- Cypress e2e testing: **npm run e2e**
