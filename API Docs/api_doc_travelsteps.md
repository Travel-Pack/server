# TravelPack User API Documentation

## Endpoints

List of available endpoints:

- `POST /travel-steps/generates`

&nbsp;

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
