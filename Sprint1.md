# Sprint 1: Project Design and User Implementation

## Tasks that were completed in this sprint:
1. [Create a landing page:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/17)
- The project was routed correctly to each destination using react-router-dom. The landing page component was designed so that it was appealing to users to view, and that it also discloses the purpose of the web application.
- It includes a navigation bar with a logo that redirects the user back to the home page, and a button to login.

2. [Create the login page](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/1) and [implement back-end connection to retrieve user information:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- Once the user clicks on the login button, it will redirect them to the login page we designed utilizing React Material UI.
- It includes textfields for the e-mail and password, with validation. There is also a hyperlink that redirects users to sign up if they don't have an account.

3. [Create the signup page](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/1) and [implement back-end connection to store user information:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- The signup page contains textfields for the user's first and last name, email address, and password. 
- The textfields have validation to authenticate valid input from the user.

4. [Create connection to mongoDB:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/2)
- The backend was able to connect to the mongoDB database.
- The schema for the user data was created.

5. [Implemented authentication for Login and Sign Up using JWT:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/16)
- The sign up endpoint was implement where user data is validated and stored in the database with hashed password and a JWT token.
- The login endpoint validates the user's credentials and responds with a JWT token if the user is authenticated.
- The token can then be used to fetch user data from database through getUser endpoint.

6. [Implement Unit Testing for sign up endpoint:](https://github.com/wurew34/Gator-SubleasingSESPR22/issues/18)
- The sign up endpoint was tested using Go testing with valid and invalid user data.

## Sprint 1 Video Demo:
- [Video Demo of Front end and Back end](https://www.youtube.com/watch?v=LSEPh0IBjCM)

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
'{
    "first_name": "Munish",
    "last_name": "Tanwar",
    "email": "munish@gmail.com",
    "password": "thisisapassword"
}
```

Sample Response	:

```json
{
  "InsertedID": "6222a40efbc8be0ff18558aa"
}
```

### 2.	Login User:

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


### 3.	Get User:

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
### 1.	Create Lease:

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

### 2.	Get Leases:
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

### 3.	Get Lease By ID:
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

### 4.	Update Lease:
##### Request	

Method: `PUT`

##### Target URL: `'http://localhost:8080/api/lease/6222a4d9fbc8be0ff18558ab'`
##### Header: `Authorization: Bearer {token}`

##### Example:	

Sample Body:

```json
'{
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
}'

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

### 5.	Delete Lease By ID:
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