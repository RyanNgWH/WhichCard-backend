# updateUserById

## Description

Updates a user by id

## API Endpoint

`PATCH /user/:userId`

## Query Parameters

| Field    | Type | Description              | Required |
| -------- | ---- | ------------------------ | -------- |
| `userId` | uuid | id of user to be updated | ✅       |

## Request Body

| Field      | Type   | Description      | Required |
| ---------- | ------ | ---------------- | -------- |
| `name`     | string | name of user     |          |
| `password` | string | password of user |          |

> Unknown fields will be ignored

## Response

### 200 OK - Succesfully updates the user

Successfully updates and returns the updated user with the given id.

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
  "status": "OK",
  "data": {
    "_id": "3618ddc6-3c4c-48b3-9dfd-5242b0fbf897",
    "name": "Jang Man Wol",
    "email": "jmwl160493@kakaot.com",
    "password": "b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342",
    "cards": [],
    "createdAt": 1689916468269,
    "updatedAt": 1689916809294,
    "__v": 0
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
      "value": "password",
      "msg": "Password does not meet requirements",
      "path": "password",
      "location": "body"
    }
  ]
}
```

### 404 Not Found - Unable to find user

Request body valid. However, the user is unable to be found in the database.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Not Found",
  "data": {
    "error": "User with id 'd2d827db-4095-4a4a-a12d-5bcf2c77eeab' not found."
  }
}
```

### 422 Unprocessable Entity - Unable to update user

Request body valid. However, the user is unable to be updated. This is usually due to the email already being used.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "The email 'luna@tinynamoo.com' is already in use."
  }
}
```
