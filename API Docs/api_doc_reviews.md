# TravelPack Destinations API Documentation

## Endpoints

List of available endpoints:

`Public Users`

- `GET /publics/reviews`
- `GET /publics/reviews/:DestinationId`

&nbsp;

## GET /publics/reviews

Description:

- Read ALL Reviews data in database

- Body

  ```json
  {
    "averageReviews": {
      "avgCost": Float,
      "avgFun": Float,
      "avgInternet": Float,
      "avgSafety": Float
    },
    "reviewByUser": [
      {
        "comment": String,
        "user": String,
      },
      ...,
    ]
  }
  ```

#### Response

_200 - Ok_

&nbsp;

## GET /publics/reviews/d/:DestinationId

Description:

- Read ONE Review data from database based on Destination

Request:

- params:

  ```json
  {
    "DestinationId": Integer
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
    "averageReviews": {
        "avgCost": Float,
        "avgFun": Float,
        "avgInternet": Float,
        "avgSafety": Float
    },
    "commentArr": [
        {
            "user": String,
            "comment": String
        },
        ...,
    ]
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

## GET /publics/reviews/h/:HotelId

Description:

- Read ONE Review data from database based on Hotel

Request:

- params:

  ```json
  {
    "HotelId": Integer
  }
  ```

#### Response

_200 - Ok_

- Body

  ```json
  {
    "averageReviews": {
        "avgCost": Float,
        "avgFun": Float,
        "avgInternet": Float,
        "avgSafety": Float
    },
    "commentArr": [
        {
            "user": String,
            "comment": String
        },
        ...,
    ]
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
