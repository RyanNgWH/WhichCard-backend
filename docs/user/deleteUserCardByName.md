# deleteUserCardByName

## Description

Delete a card from a user's card list.

## API Endpoint

`DELETE /users/:userId/cards/:cardName`

## Query Parameters

| Field      | Type   | Description                | Required |
| ---------- | ------ | -------------------------- | -------- |
| `userId`   | uuid   | id of user to be updated   | ✅       |
| `cardName` | string | name of card to be deleted | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Response

### 204 No Content - Succesfully deletes the user's card

Successfully deletes the user's card with the given name from the user's card list. If the user does not have a card with the given name, the response will still be 204 No Content.

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
      "value": "My lovely oCBC@",
      "msg": "Card name must be alphanumeric, spaces and dashes allowed",
      "path": "cardName",
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
    "error": "User with id '6d214666-d05a-43c2-ac44-98210c64ad85' not found."
  }
}
```
