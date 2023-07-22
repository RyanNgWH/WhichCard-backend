# getUserCardByName

## Description

Get a user's card by name

## API Endpoint

`POST /users/:userId/cards/:cardName`

## Query Parameters

| Field      | Type   | Description           | Required |
| ---------- | ------ | --------------------- | -------- |
| `userId`   | string | ID of the user (UUID) | ✅       |
| `cardName` | string | Name of the card      | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Successfully returns the user's card

Successfully returns the user's card.

#### Schema

| Field        | Type   | Description                                                                            |
| ------------ | ------ | -------------------------------------------------------------------------------------- |
| `cardName`   | string | Name of the card                                                                       |
| `cardExpiry` | string | Expiry date of the card (in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format) |
| `card`       | Object | Card object as defined in [here](../card/getAllCards.md#schema)                        |

#### Example

```json
{
  "status": "OK",
  "data": {
    "cardName": "My lovely OCBC",
    "cardExpiry": "2027-05-01T00:00:00.000Z",
    "card": {
      "_id": "4d4c4b8f-1ad5-4eb5-9ad6-abef702d49f6",
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
      "createdAt": 1686818885702,
      "updatedAt": 1686818885702,
      "__v": 0
    }
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
      "value": "6d214666-d05a-442-ac44-98210c64ad85",
      "msg": "userId must be a UUID",
      "path": "userId",
      "location": "params"
    },
    {
      "type": "field",
      "value": "My lovely ocbc@",
      "msg": "Card name must be alphanumeric, spaces and dashes allowed",
      "path": "cardName",
      "location": "params"
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
