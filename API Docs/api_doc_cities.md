# TravelPack Destinations API Documentation

## Endpoints

List of available endpoints:

`USER`

- `GET /cities`

&nbsp;

## GET /publics/hotels/:slug

Description:

- Read ONE Hotel data from database

#### Response

_200 - Ok_

- Body

  ```json
  {
    "id": "Integer",
    "name": "String",
    "slug": "String",
    "image": "String",
    "geocoding": "String",
    "ProvinceId": "Integer",
    "createdAt": "String",
    "updatedAt": "String"
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
