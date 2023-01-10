# TravelPack User API Documentation

## Endpoints

List of available endpoints:

- `POST /travel-steps`
- `GET /travel-steps`
- `POST /travel-steps/generates`

&nbsp;

## POST /travel-steps

Description:

- Save travel step

Request:

- headers:

    ```json
    {
      "access_token": String
    }
    ```

- Body

    ```json
    {
      "HotelId": 3,
      "name": "contoh2",
      "DestinationIds": [
        {
          "id": 13
        },
        {
          "id": 14
        }
      ]
    }
    ```

#### Response

_200 - OK_

- Body

    ```json
    {
      "msg": "Successfully add travel step"
    }
    ```

_400 - Bad Request_

- Body

    ```json
    {
      "msg": "Travel step data cannot be empty"
    }
    ```

## GET /travel-steps

Description:

- Get travel step by user id

Request:

- headers:

    ```json
    {
      "access_token": String
    }
    ```

#### Response

_200 - OK_

- Body

    ```json
    [
      {
        "id": 2,
        "UserId": 1,
        "HotelId": 3,
        "name": "contoh2",
        "createdAt": "2023-01-09T15:59:15.449Z",
        "updatedAt": "2023-01-09T15:59:15.449Z",
        "Favourites": [
          {
            "id": 3,
            "DestinationId": 13,
            "UseTravelStepId": 2,
            "createdAt": "2023-01-09T15:59:15.456Z",
            "updatedAt": "2023-01-09T15:59:15.456Z",
            "UserId": null,
            "Destination": {
              "id": 13,
              "name": "Hutan Bambu",
              "slug": "hutan-bambu",
              "address": "Jl. Raya Marina Asri, Keputih, Kec. Sukolilo, Kota Surabaya, Jawa Timur 60111",
              "mainImg": "https://www.pegipegi.com/travel/wp-content/uploads/2017/10/alamat-taman-sakura-keputih-surabaya.jpg",
              "cost": 13000,
              "geocoding": "-7.29398869645369, 112.8016808827438",
              "description": "this is destination DESCRIPTIONS SECTION!",
              "CityId": 3,
              "UserId": 1,
              "createdAt": "2023-01-09T15:58:02.016Z",
              "updatedAt": "2023-01-09T15:58:02.016Z"
            }
          },
          ...
        ],
        "Hotel": {
          "id": 4,
          "name": "Livinn Hostel Surabaya",
          "slug": "livinn-hostel-surabaya",
          "image": "https://jenishotel.info/wp-content/uploads/2019/09/livinn-hostel.jpg",
          "address": "Jl. jalan sehat",
          "geocoding": "-7.263283, 112.751178",
          "isRecommended": true,
          "price": 88000,
          "CityId": 3,
          "createdAt": "2023-01-09T15:58:02.021Z",
          "updatedAt": "2023-01-09T15:58:02.021Z"
        }
      },
      ...
    ]
    ```

## POST /travel-steps/generates

Description:

- Generate travel steps based on user input

Request:

- headers:

    ```json
    {
      "access_token": String
    }
    ```

- Body

    ```json
    {
      "budgetDestination": 2000000,
      "budgetHotel": 100000,
      "CityId": 3,
      "DestinationIds": [],
      "numberOfDestination": 2
    }
    ```

#### Response

_200 - OK_

- Body

    ```json
    {
      "travelStep": [
        {
          "hotel": {
            "id": 3,
            "name": "Livinn Hostel Surabaya",
            "image": "https://jenishotel.info/wp-content/uploads/2019/09/livinn-hostel.jpg",
            "geocoding": " -7.263283,112.751178 (type: ROOFTOP)",
            "isRecommended": true,
            "price": 88000,
            "CityId": 3,
            "createdAt": "2023-01-07T05:04:58.427Z",
            "updatedAt": "2023-01-07T05:04:58.427Z"
          },
          "destination": [
            {
              "id": 14,
              "name": "Sanggar Agung Temple",
              "slug": "sanggar-agung-temple",
              "address": "Jl. Sukolilo No.100, Sukolilo Baru, Kec. Bulak, Kota Surabaya, Jawa Timur 60122",
              "mainImg": "https://www.surabayarollcake.com/wp-content/uploads/2019/01/Klenteng-Sanggar-Agung-Surabaya.jpg",
              "cost": 10000,
              "geocoding": "-7.247488948002271, 112.80180008459418",
              "CityId": 3,
              "UserId": 2,
              "createdAt": "2023-01-07T05:04:58.419Z",
              "updatedAt": "2023-01-07T05:04:58.419Z"
            },
            {
              "id": 15,
              "name": "Food Junction Grand Pakuwon",
              "slug": "food-junction-grand-pakuwon",
              "address": "Jalan Grand Banjar Mutiara Asri No.1, Banjar Sugihan, Kec. Tandes, Kota Surabaya, Jawa Timur 60184",
              "mainImg": "https://www.pakuwonjati.com/upload/2020/05/5eb035d16732c-pkw-mall-com-08fj-gallery0.jpg",
              "cost": 0,
              "geocoding": "-7.250777204884361, 112.66208039993745",
              "CityId": 3,
              "UserId": 3,
              "createdAt": "2023-01-07T05:04:58.419Z",
              "updatedAt": "2023-01-07T05:04:58.419Z"
            }
          ]
        },
        ...
      ]
    }
    ```

_400 - Bad Request_

- Body

    ```json
    {
      "msg": "Number of destination must be equal or higher than selected destinations"
    }
    ```
_404 - Not Found_

- Body

    ```json
    {
      "msg": "Sorry, you don't get any matched destination. Maybe try to increase your destination budget or lower your number of destination?"
    }
    OR
    {
      "msg": "Sorry, you don't get any matched hotel. Maybe try to increase your hotel budget?"
    }
    ```
### Global Error
_Response (401 - Unauthorized)_

  ```json
  {
    "msg": "Invalid Token/Authentication Failed"
  }
  ```

_Response (500 - Internal Server Error)_

  ```json
  {
    "msg": "Internal server error"
  }
  ```