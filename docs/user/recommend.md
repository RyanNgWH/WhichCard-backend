# recommend

## Description

Recommend a card to a user for a specified transaction.

## API Endpoint

`POST /users/:userId/recommend`

## Query Parameters

| Field    | Type   | Description           | Required |
| -------- | ------ | --------------------- | -------- |
| `userId` | string | ID of the user (UUID) | ✅       |

## Request Body

| Field      | Type   | Description                              | Required |
| ---------- | ------ | ---------------------------------------- | -------- |
| `merchant` | string | Merchant where transaction is to be made | ✅       |
| `amount`   | number | Amount of the transaction                | ✅       |

## Response

### 200 OK - Succesfully returns the recommended card & cashback amount

Successfully returns the recommended card and cashback amount for the given transaction.

#### Schema

| Field            | Type   | Description                                                         |
| ---------------- | ------ | ------------------------------------------------------------------- |
| `card`           | string | Card recommended for the transaction (Card name of the user's card) |
| `cashbackAmount` | number | Cashback amount for the transaction                                 |

#### Example

```json
{
  "status": "OK",
  "data": {
    "card": "My lovely ocbc",
    "cashbackAmount": 2.4
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
      "value": "40s",
      "msg": "Transaction amount must be a float",
      "path": "amount",
      "location": "body"
    }
  ]
}
```

### 404 Not Found - Unable to find user or merchant

Request body valid. However, the user or merchant is unable to be found in the database.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Not Found",
  "data": {
    "error": "User with id '3618ddc6-3c4c-48b3-9dfd-5242b0fbf887' not found."
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

### 422 Unprocessable Entity - Unable to recommend card

Request body valid. However, the user is unable to be recommended a card for the given transaction. This is usually due to the user not having any cards.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "User has no cards"
  }
}
```
