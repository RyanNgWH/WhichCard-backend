# createUser

## Description

Create a new user in the database.

## API Endpoint

`POST /users`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field      | Type   | Description                             | Required |
| ---------- | ------ | --------------------------------------- | -------- |
| `name`     | string | Full name of the new user to be created | ✅       |
| `email`    | string | Email of the new user to be created     | ✅       |
| `password` | string | Password of the new user to be created  | ✅       |

## Responses

### 201 OK - Successfully creates the user

Successfully creates the user and returns the created user.

#### Schema

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `_id`       | string | ID of the user (UUID)                             |
| `name`      | string | Full name of the user                             |
| `email`     | string | Email of the user                                 |
| `password`  | string | Hash (SHA-256) of the password of the user        |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |
| `__v`       | number | Version of the user                               |

#### Example

```json
{
  "status": "Created",
  "data": {
    "_id": "a3cec349-8d87-411e-8430-f3e4e16c8054",
    "name": "Sunny",
    "email": "kimsun@goblinchiken.com",
    "password": "263e895c8882006349e41dc4a09b80ee2d8802d4b85218996cc5dee7bf3bc744",
    "cards": [],
    "createdAt": 1689916611983,
    "updatedAt": 1689916611983,
    "__v": 0
  }
}
```

### 400 Bad Request - Invalid request body

Request body is invalid. Might be missing required fields or fields are of an invalid format.

#### Schema

Validation errors as defined on the express validator [documentation](https://express-validator.github.io/docs/api/validation-result/#error-types).

#### Example

```json
{
  "status": "Bad Request",
  "errors": [
    {
      "type": "field",
      "value": "test",
      "msg": "Password does not meet requirements",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### 422 Unprocessable Entity - Unable to create user

Request body valid. However, the user is unable to be created. This is usually due to the email already being used.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "User with email 'luna@tinynamoo.com' already exists."
  }
}
```
