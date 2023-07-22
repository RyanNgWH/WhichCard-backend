# deleteUserById

## Description

Delete a user from the database with the given id.

## API Endpoint

`DELETE /user/:userId`

## Query Parameters

| Field    | Type   | Description           | Required |
| -------- | ------ | --------------------- | -------- |
| `userId` | string | ID of the user (UUID) | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Response

### 204 No Content - Succesfully deletes the user

Successfully deletes the user with the given id from the database. If the user does not exist, the response will still be 200 OK.

> Response body will be empty

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
