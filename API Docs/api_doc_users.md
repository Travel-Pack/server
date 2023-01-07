# TravelPack User API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`

&nbsp;

## POST /register

Description:

- Create new account as Admin

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
      "fullName": String,
      "phoneNumber": String,
      "email": String | required,
      "password": Integer | required | Minimum 5 characters,
      "isPremium": Boolean,
      "role": String
    }
    ```

#### Response

_201 - Created_

- Body

    ```json
    {
      {
        "email": "String"
      }
    }
    ```

_400 - Bad Request_

- Body

    ```json
    {
     "message": [
        "Email is required",
        "Password is required",
        "Minimum password length must be 5 letter"
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
