# updateUserCardByName

## Description

Update a user's card by name.

## API Endpoint

`PATCH /users/:userId/cards/:cardName`

## Query Parameters

| Field      | Type   | Description           | Required |
| ---------- | ------ | --------------------- | -------- |
| `userId`   | string | ID of the user (UUID) | ✅       |
| `cardName` | string | Name of the card      | ✅       |

## Request Body

| Field        | Type   | Description                                                            | Required |
| ------------ | ------ | ---------------------------------------------------------------------- | -------- |
| `cardName`   | string | Name of the card to be added to the user                               |          |
| `cardExpiry` | string | Expiry date of the card to be added to the user (in YYYY-MM-DD format) |          |
| `issuer`\*   | string | Issuer of the card to be added to the user (e.g `ocbc`)                |          |
| `type`\*     | string | Type of the card to be added to the user (e.g `365 credit`)            |          |

> Note: Only the fields that are to be updated need to be included in the request body. Any other fields will be ignored.

> Note: If `issuer` or `type` is included in the request body, both fields must be included.

## Responses

### 200 OK - Successfully returns the user's updated card

Successfully returns the user's updated card.

#### Schema

| Field        | Type   | Description                                                                            |
| ------------ | ------ | -------------------------------------------------------------------------------------- |
| `cardName`   | string | Name of the card                                                                       |
| `cardExpiry` | string | Expiry date of the card (in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format) |
| `card`       | string | ID of the card (in UUID format)                                                        |

#### Example

```json
{
  "status": "OK",
  "data": {
    "cardName": "My lovely OCBC",
    "cardExpiry": "2027-05-02T00:00:00.000Z",
    "card": "4d4c4b8f-1ad5-4eb5-9ad6-abef702d49f6"
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
      "value": {
        "issuer": "ocbc",
        "cardExpiry": "2027-05-02T00:00:00.000Z"
      },
      "msg": "If updating type or issuer, both must be provided",
      "param": "issuer/type",
      "location": "body"
    }
  ]
}
```

### 404 Not Found - Unable to find user or card

Request body valid. However, the user or card is unable to be found in the database.

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

```json
{
  "status": "Not Found",
  "data": {
    "error": "User with id '6d214666-d05a-44c2-ac44-98210c64ad85' has no card with name 'My lovely ocbc'."
  }
}
```

### 422 Unprocessable Entity - Unable to update user's card

Request body valid. However, the user's card is unable to be updated in the database. This is likely due to a duplicate card name.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "User with id '6d214666-d05a-44c2-ac44-98210c64ad85' already has a card with name 'My lovely ocbc'."
  }
}
```
