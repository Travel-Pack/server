## Endpoints :

List of available endpoints:

- `POST /midtrans`

## POST /midtrans

Description:

- Get Snap Token by sending price

Request :

- Header :
  - access_token: "string"

Response :

_Response (201 - Created)_

```json
{
    "string"
}
```

_Response (404 - Bad Request)_

```json
{
  "code": "integer",
  "message": "string"
}
```
