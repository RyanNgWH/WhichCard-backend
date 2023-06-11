# login

## Description

Login a user.

## API Endpoint

`POST /users/login`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field      | Type   | Description                      | Required |
| ---------- | ------ | -------------------------------- | -------- |
| `email`    | string | Email of the user to be login    | ✅       |
| `password` | string | Password of the user to be login | ✅       |

## Response

### 200 OK - Succesfully login the user

Successfully login the user with the given email and password. Returns the user.

#### Schema

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `id`        | string | ID of the user (UUID)                             |
| `name`      | string | Full name of the user                             |
| `email`     | string | Email of the user                                 |
| `password`  | string | Password of the user                              |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |

#### Example

```json
{
  "status": "OK",
  "data": {
    "name": "Luna",
    "email": "luna@tinynamoo.com",
    "password": "P@ssw0rd",
    "id": "d2d827db-4095-4a4a-a12d-5bcf2c77eeaa",
    "createdAt": 1686230808254,
    "updatedAt": 1686230808254
  }
}
```

### 400 Bad Request - Invalid request

Request is invalid. Might be missing required fields or fields are of an invalid format.

#### Schema

Validation errors as defined on the express validator [documentation](https://express-validator.github.io/docs/api/validation-result/#error-types).

#### Example

```json
{
  "status": "Bad Request",
  "errors": [
    {
      "type": "field",
      "value": "luna@tinynamoo",
      "msg": "Email is invalid",
      "path": "email",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized - Invalid credentials

Request is valid. However, the credentials are invalid and user cannot be logged in.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unauthorized",
  "data": {
    "error": "Incorrect credentials."
  }
}
```
