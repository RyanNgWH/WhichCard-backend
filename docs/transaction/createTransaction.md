# createTransaction

## Description

Create a new transaction in the database.

## API Endpoint

`POST /transactions`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field              | Type     | Description                                                           | Required |
| ------------------ | -------- | --------------------------------------------------------------------- | -------- |
| `user`             | User     | User who performed the transaction                                    | ✅       |
| `userCard`         | string   | Card in user's wallet that was used for the transaction               | ✅       |
| `merchant`         | Merchant | Merchant where transaction was performed                              | ✅       |
| `dateTime`         | Date     | Date and time when the transaction was performed (in ISO 8601 format) | ✅       |
| `amount`           | number   | Amount of the transaction                                             | ✅       |
| `cashbackAmount`   | number   | Amount of the cashback received from the transaction                  | ✅       |
| `cashbackCategory` | string   | Category of the cashback received                                     | ✅       |

## Responses

### 200 OK - Successfully creates the transaction

Successfully creates the transaction and returns the created transaction.

#### Schema

| Field              | Type     | Description                                                           |
| ------------------ | -------- | --------------------------------------------------------------------- |
| `_id`              | string   | ID of the transaction (UUID)                                          |
| `user`             | User     | User who performed the transaction                                    |
| `userCard`         | string   | Card in user's wallet that was used for the transaction               |
| `merchant`         | Merchant | Merchant where transaction was performed                              |
| `dateTime`         | Date     | Date and time when the transaction was performed (in ISO 8601 format) |
| `amount`           | number   | Amount of the transaction                                             |
| `cashbackAmount`   | number   | Amount of the cashback received from the transaction                  |
| `cashbackCategory` | string   | Category of the cashback received                                     |
| `createdAt`        | number   | Timestamp of when the transaction was created (in epoch)              |
| `updatedAt`        | number   | Timestamp of when the transaction was updated (in epoch)              |
| `__v`              | number   | Version of the transaction                                            |

#### Example

```json
{
  "status": "Created",
  "data": {
    "_id": "670d5ca0-b29c-4303-ae4b-10f155fb79bc",
    "user": "e92f852d-06e7-4572-baa3-ef105918e15e",
    "userCard": "My Lovely OCBC",
    "merchant": "63bb60e9-3ca5-4552-bcdb-21fabe64e13d",
    "dateTime": "2023-06-02T00:00:00.000Z",
    "amount": 20,
    "cashbackAmount": 0.02,
    "cashbackCategory": "dining",
    "createdAt": 1689912013594,
    "updatedAt": 1689912013594,
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
      "value": "e92f852d-06e7-4572-baa3-ef105918e15se",
      "msg": "User ID must be a UUID",
      "path": "user",
      "location": "body"
    }
  ]
}
```

### 404 Not Found - Unable to find user/merchant/user card

Request body valid. However, the transaction cannot be created as one or more of the following fields cannot be found in the database.

- User
- Merchant
- User card

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Not Found",
  "data": {
    "error": "User with id 'e92f852d-06e7-4572-baa3-ef105918e15f' not found."
  }
}
```

### 422 Unprocessable Entity - Unable to create transaction

Request body valid. However, the transaction is unable to be created. This is usually due to a duplicate transaction (same user, merchant, dateTime & amount).

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Transaction with user 'e92f852d-06e7-4572-baa3-ef105918e15e', merchant '63bb60e9-3ca5-4552-bcdb-21fabe64e13d', dateTime 'Fri Jun 02 2023 08:00:00 GMT+0800 (Singapore Standard Time)' & amount '20' already exists."
  }
}
```
