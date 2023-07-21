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

<<<<<<< HEAD
| Field              | Type   | Description                                              |
| ------------------ | ------ | -------------------------------------------------------- |
| `_id`              | string | ID of the user (UUID)                                    |
| `name`             | string | Full name of the user                                    |
| `email`            | string | Email of the user                                        |
| `password`         | string | Password of the user                                     |
| `cards`            | array  | List of cards of the user                                |
| `cards.cardName`   | string | Name of the card of the user                             |
| `cards.cardExpiry` | string | Expiry date of the card of the user (in ISO 8601 format) |
| `cards.card`       | string | ID of the card (in UUID format)                          |
| `createdAt`        | number | Timestamp of when the user was created (in epoch)        |
| `updatedAt`        | number | Timestamp of when the user was updated (in epoch)        |
| `__v`              | number | Version of the user                                      |
=======
| Field              | Type   | Description                                                |
| ------------------ | ------ | ---------------------------------------------------------- |
| `_id`              | string | ID of the user (UUID)                                      |
| `name`             | string | Full name of the user                                      |
| `email`            | string | Email of the user                                          |
| `password`         | string | Hash (SHA-256) of the password of the user                 |
| `cards`            | array  | List of cards of the user                                  |
| `cards.cardName`   | string | Name of the card of the user                               |
| `cards.cardExpiry` | string | Expiry date of the card of the user (in YYYY-MM-DD format) |
| `cards.card`       | string | ID of the card (in UUID format)                            |
| `createdAt`        | number | Timestamp of when the user was created (in epoch)          |
| `updatedAt`        | number | Timestamp of when the user was updated (in epoch)          |
| `__v`              | number | Version of the user                                        |
>>>>>>> master

#### Example

```json
{
  "status": "Created",
  "data": {
    "_id": "3618ddc6-3c4c-48b3-9dfd-5242b0fbf897",
    "name": "Jang Man Wol",
    "email": "jmwl160493@kakaot.com",
    "password": "b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342",
    "cards": [],
    "createdAt": 1689916468269,
    "updatedAt": 1689916468269,
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
