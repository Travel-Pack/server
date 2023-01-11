# TravelPack Destinations API Documentation

## Endpoints

List of available endpoints:

`Public User`

- `GET /publics/destinations`
- `GET /publics/destinations/best`
- `GET /publics/destinations/:slug`

`ADMIN`

<!-- - `POST /destinations` -->

- `GET /destinations`
- `GET /destinations/:slug`

## GET /publics/destinations

Description:

- Read ALL Destinations data from database

#### Response

_200 - Ok_

- Body

  ```json
  [
    {
      "id": Integer,
      "name": String,
      "slug": String,
      "address": String,
      "mainImg": String,
      "cost": Integer,
      "geocoding": String,
      "description": String,
      "CityId": Integer,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Reviews": Array,
      "Images": Array
    },
    ...
  ]
  ```

&nbsp;

## GET /publics/destinations/best

Description:

- Read ALL BEST Destinations data from database

#### Response

_200 - Ok_

- Body

  ```json
  [
    {
      "id": Integer,
      "name": String,
      "slug": String,
      "cost": Integer,
      "mainImg": String,
      "cityName": String,
      "avg_review": Float
    },
    ...,
  ]
  ```

&nbsp;

## GET /publics/destinations/:slug

Description:

- Read ONE Destinations data from database

Request:

- params:

  ```json
  {
    "slug": "string"
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
    "destination": {
      "id": Integer,
      "name": String,
      "slug": String,
      "address": String,
      "mainImg": String,
      "cost": Integer,
      "geocoding": String,
      "description": String,
      "CityId": Integer,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Reviews": Array,
      "Images": Array
    },
    "User": {
      "fullName": String
    }
    "reviews": {
      "averageCost": Float,
      "averageFun": Float,
      "averageInternet": Float,
      "averageSafety": Float
    },
    "comment": Array
    ...
  }
  ```

  _404 - Not Found_

- Body

  ```json
  {
    "msg": "Destination Not Found"
  }
  ```

&nbsp;

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

## GET /destinations

Description:

- Read ALL Destinations data from database

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  [
    {
      "id": Integer,
      "name": String,
      "slug": String,
      "address": String,
      "mainImg": String,
      "cost": Integer,
      "geocoding": String,
      "description": String,
      "CityId": Integer,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Reviews": Array,
      "Images": Array
    },
    ...
  ]
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "msg": "Invalid Token/Authentication Failed"
  }
  ```

&nbsp;

## GET /destinations/:slug

Description:

- Read ONE Destinations data from database

Request:

- headers:

  ```json
  {
    "access_token": "string"
  }
  ```

- params:

  ```json
  {
    "slug": "string"
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
    "destination": {
      "id": Integer,
      "name": String,
      "slug": String,
      "address": String,
      "mainImg": String,
      "cost": Integer,
      "geocoding": String,
      "description": String,
      "CityId": Integer,
      "UserId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Reviews": Array,
      "Images": Array
    },
    "User": {
      "fullName": String
    }
    "reviews": {
      "averageCost": Float,
      "averageFun": Float,
      "averageInternet": Float,
      "averageSafety": Float
    },
    "comment": Array
    ...
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "msg": "Invalid Token/Authentication Failed"
  }
  ```

  _404 - Not Found_

- Body

  ```json
  {
    "msg": "Destination Not Found"
  }
  ```

&nbsp;
