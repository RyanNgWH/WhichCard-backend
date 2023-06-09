# getUserById

## Description

Get a user by id.

## API Endpoint

`GET /users/:userId`

## Query Parameters

| Field    | Type | Description              | Required |
| -------- | ---- | ------------------------ | -------- |
| `userId` | uuid | id of user to be updated | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Succesfully returns the user

Successfully returns the user with the given id.

#### Schema

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `_id`       | string | ID of the user (UUID)                             |
| `name`      | string | Full name of the user                             |
| `email`     | string | Email of the user                                 |
| `password`  | string | Password of the user                              |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |
| `__v`       | number | Version of the user                               |

#### Example

```json
{
  "status": "OK",
  "data": {
    "_id": "75cfda89-cded-416b-9704-9debdb17e3ab",
    "name": "Tiny Luna",
    "email": "luna@tinynamoo.com",
    "password": "P@ssw0rd",
    "createdAt": 1686468544825,
    "updatedAt": 1686468544825,
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
      "value": "1",
      "msg": "userId must be a UUID",
      "path": "userId",
      "location": "params"
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
