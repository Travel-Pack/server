# TravelPack Destinations API Documentation

## Endpoints

List of available endpoints:

- `POST /destinations`
- `GET /destinations`
- `GET /destinations/:slug`

&nbsp;

## POST /destinations

Description:

- Adding new destinations as Admin

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

- Body

  ```json
  {
     "name": String,
     "address": String,
     "mainImg": String,
     "description": String,
     "cost": Integer,
     "geocoding": String,
     "CityId": Integer,
     "imgUrl": String
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  "Ok - Destination Added"
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": [
      "Name is required",
      "Address is required",
      "Main image is required",
      "Cost is required",
      "Location is required",
      "Description is required",
      "City is required",
      "UserId is required"
    ]
  }
  ```

&nbsp;

## POST /login

Description:

- Login account using email and password as an Admin

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

- Body

  ```json
  {
    "email": String | required,
    "password": String | required
  }
  ```

#### Response

_201 - Created_

- Body

  ```json
  {
    {
      "access_token": "String"
    }
  }
  ```

_401 - Unauthorized_

- Body

  ```json
  {
    "message": "Invalid email or password"
  }
  ```

&nbsp;
