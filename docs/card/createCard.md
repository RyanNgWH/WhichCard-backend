# createCard

## Description

Create a new card in the database.

## API Endpoint

`POST /cards`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field                   | Type            | Description                                       | Required |
| ----------------------- | --------------- | ------------------------------------------------- | -------- |
| `type`                  | string          | Card type (e.g. "365 credit", "frank credit")     | ✅       |
| `issuer`                | string          | Issuer of the card (e.g. "ocbc", "dbs")           | ✅       |
| `benefits`              | list of objects | List of benefits of the card                      |          |
| `benefits.category`     | string          | Category of the benefit (e.g. "dining", "travel") |          |
| `benefits.mccs`         | list of numbers | List of MCCs of the benefit                       |          |
| `benefits.cashbackRate` | number          | Rate of the cashback in percentages (e.g. 1.5)    |          |
| `exclusions`            | list of numbers | List of exclusions (MCCs) of the card             |          |
| `cashbackLimit`         | number          | Limit of the cashback in dollars (e.g. 100)       |          |
| `minimumSpend`          | number          | Minimum spend in dollars (e.g. 500)               |          |

## Responses

### 200 OK - Successfully creates the card

Successfully creates the card and returns the created card.

#### Schema

| Field                   | Type            | Description                                       |
| ----------------------- | --------------- | ------------------------------------------------- |
| `_id`                   | string          | ID of the card (UUID)                             |
| `type`                  | string          | Card type (e.g. "365 credit", "frank credit")     |
| `issuer`                | string          | Issuer of the card (e.g. "ocbc", "dbs")           |
| `benefits`              | list of objects | List of benefits of the card                      |
| `benefits.category`     | string          | Category of the benefit (e.g. "dining", "travel") |
| `benefits.mccs`         | list of numbers | List of MCCs of the benefit                       |
| `benefits.cashbackRate` | number          | Rate of the cashback in percentages (e.g. 1.5)    |
| `exclusions`            | list of numbers | List of exclusions (MCCs) of the card             |
| `cashbackLimit`         | number          | Limit of the cashback in dollars (e.g. 100)       |
| `minimumSpend`          | number          | Minimum spend in dollars (e.g. 500)               |
| `createdAt`             | number          | Timestamp of when the card was created (in epoch) |
| `updatedAt`             | number          | Timestamp of when the card was updated (in epoch) |
| `__v`                   | number          | Version of the card                               |

#### Example

```json
{
  "status": "Created",
  "data": {
    "_id": "d6bb1de8-96b0-4d04-a712-cdce145913d4",
    "type": "365 credit",
    "issuer": "ocbc",
    "benefits": [
      {
        "category": "dining",
        "mccs": [5812, 5814, 5811],
        "cashbackRate": 6
      },
      {
        "category": "grocery",
        "mccs": [5411],
        "cashbackRate": 3
      },
      {
        "category": "transport",
        "mccs": [4111, 4011, 4112, 4121, 4131],
        "cashbackRate": 3
      },
      {
        "category": "petrol",
        "mccs": [5541, 5542],
        "cashbackRate": 6
      },
      {
        "category": "travel",
        "mccs": [4411, 4511],
        "cashbackRate": 3
      },
      {
        "category": "telecommunications",
        "mccs": [],
        "cashbackRate": 3
      },
      {
        "category": "electricity",
        "mccs": [],
        "cashbackRate": 3
      },
      {
        "category": "others",
        "mccs": [],
        "cashbackRate": 0.3
      }
    ],
    "exclusions": [
      4784, 4829, 5047, 5199, 5262, 6010, 6012, 6051, 6211, 6300, 5960, 6540,
      7349, 7523, 7995, 8062, 8211, 8220, 8241, 8244, 8249, 8299, 8398, 8661,
      8651, 8675, 8699, 9211, 9222, 9223, 9311
    ],
    "cashbackLimit": 80,
    "minimumSpend": 800,
    "createdAt": 1686932012979,
    "updatedAt": 1686932012979,
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
      "value": "365 credit@",
      "msg": "Card type must be alphanumeric, spaces allowed",
      "path": "type",
      "location": "body"
    }
  ]
}
```

### 422 Unprocessable Entity - Unable to create card

Request body valid. However, the card is unable to be created. This is usually due to a duplicate card (same type and issuer).

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Card with type '365 credit' and issuer 'ocbc' already exists."
  }
}
```
