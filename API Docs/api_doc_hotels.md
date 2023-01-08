# TravelPack Destinations API Documentation

## Endpoints

List of available endpoints:

`Public Users`

- `GET /publics/hotels`
- `GET /publics/hotels/:slug`

&nbsp;

## POST /publics/hotels

Description:

- Read ALL hotels data in database

- Body

  ```json
  [
    {
      "id": Integer,
      "name": String,
      "slug": String,
      "image": String,
      "address": String,
      "geocoding": String,
      "isRecommended": Boolean,
      "price": Integer,
      "CityId": Integer,
      "createdAt": Date,
      "updatedAt": Date,
      "Reviews": Array,
      "Images": Array
    },
    ...,
  ]
  ```

#### Response

_200 - Ok_

&nbsp;

## GET /publics/hotels/:slug

Description:

- Read ONE Hotel data from database

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
    "id": Integer,
    "name": String,
    "slug": String,
    "image": String,
    "address": String,
    "geocoding": String,
    "isRecommended": Boolean,
    "price": Integer,
    "CityId": Integer,
    "createdAt": Date,
    "updatedAt": Date,
    "Reviews": Array,
    "Images": Array,
    "avg_cost": Float,
    "avg_fun": Float,
    "avg_internet": Float,
    "avg_safety": Float
  }
  ```

_404 - Not Found_

- Body

  ```json
  {
    "msg": "Hotel Not Found"
  }
  ```

&nbsp;
