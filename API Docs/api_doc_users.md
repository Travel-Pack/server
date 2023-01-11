# TravelPack User API Documentation

## Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /users`
- `PUT /users`
- `PATCH /users/activatePremium`
- `PATCH /users/deactivatePremium`
- `PATCH /users/incrimentPoint`

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

## Authentication

Request :
- Header :
    - acces_token : "your secret access token"

Response :
- 500 Internal Server Error
```json
{
    "message": {
        "name": "JsonWebTokenError",
        "message": "Invalid Token/Authentication Failed"
    }
}
```

&nbsp;

## GET /users

Request :

- Header :
    - acces_token : "your secret access token"

Response :
- 200 OK
```json
[
    {
        "id": "number",
        "fullName": "string",
        "phoneNumber": "string",
        "email": "string",
        "password": "string",
        "isPremium": "boolean",
        "role": "string",
        "point": "integer",
        "createdAt": "date",
        "updatedAt": "date"
    }
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "User not found"
}
```

&nbsp;

## PUT /users

Request :

- Header :
    - acces_token : "your secret access token"

- Body :

```json
{
  "newfullName": "string",
  "newPhoneNumber": "string",
  "newEmail": "string",
  "newPassword": "string",
}
```

Response :
- 200 OK
```json
[
    {
        "message": "User successfully updated"
    }
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "User not found"
}
```

&nbsp;

## PATCH /users/activatePremium

Request :

- Header :
    - acces_token : "your secret access token"

- Body :

```json
{
  "newIsPremium": "boolean"
}
```

Response :
- 200 OK
```json
[
    {
        "message": "User status has been updated to premium"
    }
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "User not found"
}
```
- 400 Bad Request
```json
{
    "code": 400,
    "message": "User status already premium"
}
```

&nbsp;

## PATCH /users/deactivatePremium

Request :

- Header :
    - acces_token : "your secret access token"

- Body :

```json
{
  "newIsPremium": "boolean"
}
```

Response :
- 200 OK
```json
[
    {
        "message": "User status no longer premium"
    }
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "User not found"
}
```
- 400 Bad Request
```json
{
    "code": 400,
    "message": "User status already not premium"
}
```

&nbsp;

## PATCH /incrimentPoint

Request :

- Header :
    - acces_token : "your secret access token"

- Body :

```json
{
  "newPoint": "integer"
}
```

Response :
- 200 OK
```json
[
    {
        "message": "User point has been incrimented by 1"
    }
]
```
- 404 Not Found
```json
{
    "code": 404,
    "message": "User not found"
}
```

&nbsp;
