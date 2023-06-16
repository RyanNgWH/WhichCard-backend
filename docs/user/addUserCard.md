# addUserCard

## Description

Adds a card to the user's list of cards.

## API Endpoint

`POST /users/:userId/cards`

## Query Parameters

| Field    | Type   | Description           | Required |
| -------- | ------ | --------------------- | -------- |
| `userId` | string | ID of the user (UUID) | ✅       |

## Request Body

| Field        | Type   | Description                                                            | Required |
| ------------ | ------ | ---------------------------------------------------------------------- | -------- |
| `cardName`   | string | Name of the card to be added to the user                               | ✅       |
| `cardExpiry` | string | Expiry date of the card to be added to the user (in YYYY-MM-DD format) | ✅       |
| `issuer`     | string | Issuer of the card to be added to the user (e.g `ocbc`)                | ✅       |
| `type`       | string | Type of the card to be added to the user (e.g `365 credit`)            | ✅       |

## Responses

### 200 OK - Successfully add card to user

Successfully add card to user.

#### Schema

| Field              | Type   | Description                                                |
| ------------------ | ------ | ---------------------------------------------------------- |
| `_id`              | string | ID of the user (UUID)                                      |
| `name`             | string | Full name of the user                                      |
| `email`            | string | Email of the user                                          |
| `password`         | string | Password of the user                                       |
| `cards`            | array  | List of cards of the user                                  |
| `cards.cardName`   | string | Name of the card of the user                               |
| `cards.cardExpiry` | string | Expiry date of the card of the user (in YYYY-MM-DD format) |
| `cards.card`       | string | ID of the card (in UUID format)                            |
| `createdAt`        | number | Timestamp of when the user was created (in epoch)          |
| `updatedAt`        | number | Timestamp of when the user was updated (in epoch)          |
| `__v`              | number | Version of the user                                        |

#### Example

```json
{
  "status": "OK",
  "data": {
    "_id": "6d214666-d05a-44c2-ac44-98210c64ad85",
    "name": "test",
    "email": "test@test.com",
    "password": "P@ssw0rd",
    "createdAt": 1686473842460,
    "updatedAt": 1686929223875,
    "__v": 11,
    "cards": [
      {
        "cardName": "My lovely OCBC",
        "cardExpiry": "2027-05-01T00:00:00.000Z",
        "card": "4d4c4b8f-1ad5-4eb5-9ad6-abef702d49f6"
      }
    ]
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
      "value": "My lovely OCBC@",
      "msg": "Card name must be alphanumeric, spaces and dashes allowed",
      "path": "cardName",
      "location": "body"
    },
    {
      "type": "field",
      "value": "2027-05-1",
      "msg": "Card expiry must be a valid date in YYYY-MM-DD format",
      "path": "cardExpiry",
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
    "error": "User with id '6d214666-d05a-43c2-ac44-98210c64ad85' not found."
  }
}
```

### 422 Unprocessable Entity - Unable to add card to user

Request body valid. However, the card is unable to be added to the user's list of cards. This is usually due to the card name already being used or an invalid combination of type and issuer.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Card with name 'My lovely OCBC' already exists in user's cards."
  }
}
```

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Card with type 'everyday card' and issuer 'dbs' not found."
  }
}
```
