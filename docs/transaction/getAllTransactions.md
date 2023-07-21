# getAllTransactions

## Description

Get all transactions in the database.

## API Endpoint

`GET /transactions`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Succesfully returns all transactions in the database

Returns all transactions in the database.

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
  "status": "OK",
  "data": [
    {
      "_id": "afab64d3-e901-4bca-a019-88b9918d9323",
      "user": {
        "_id": "e92f852d-06e7-4572-baa3-ef105918e15e",
        "name": "Jang Man Wol",
        "email": "jmwl160493@kakaot.com",
        "password": "P@ssw0rd",
        "createdAt": 1686467427069,
        "updatedAt": 1686467427069,
        "__v": 1,
        "cards": [
          {
            "cardName": "My Lovely OCBC",
            "cardExpiry": "2027-05-01T00:00:00.000Z",
            "card": "dba21fa7-ec07-47d0-9e14-66afe3157829"
          }
        ]
      },
      "userCard": "My Lovely OCBC",
      "merchant": {
        "_id": "63bb60e9-3ca5-4552-bcdb-21fabe64e13d",
        "name": "ikea_restaurant",
        "prettyName": "IKEA Restaurant",
        "address": "50 Jurong Gateway Rd, #04-20/21/22, Singapore 608549",
        "mcc": 5814,
        "longitude": 103.74366453177412,
        "latitude": 1.3339052098055968,
        "createdAt": 1689859078406,
        "updatedAt": 1689859078406,
        "status": "active",
        "__v": 0
      },
      "dateTime": "2023-05-01T00:00:00.000Z",
      "amount": 40,
      "cashbackAmount": 0.04,
      "cashbackCategory": "dining",
      "createdAt": 1689910642199,
      "updatedAt": 1689910642199,
      "__v": 0
    },
    {
      "_id": "b7e5ff48-e478-427e-8fb9-0670661dc9e4",
      "user": {
        "_id": "e92f852d-06e7-4572-baa3-ef105918e15e",
        "name": "Jang Man Wol",
        "email": "jmwl160493@kakaot.com",
        "password": "P@ssw0rd",
        "createdAt": 1686467427069,
        "updatedAt": 1686467427069,
        "__v": 1,
        "cards": [
          {
            "cardName": "My Lovely OCBC",
            "cardExpiry": "2027-05-01T00:00:00.000Z",
            "card": "dba21fa7-ec07-47d0-9e14-66afe3157829"
          }
        ]
      },
      "userCard": "My Lovely OCBC",
      "merchant": {
        "_id": "63bb60e9-3ca5-4552-bcdb-21fabe64e13d",
        "name": "ikea_restaurant",
        "prettyName": "IKEA Restaurant",
        "address": "50 Jurong Gateway Rd, #04-20/21/22, Singapore 608549",
        "mcc": 5814,
        "longitude": 103.74366453177412,
        "latitude": 1.3339052098055968,
        "createdAt": 1689859078406,
        "updatedAt": 1689859078406,
        "status": "active",
        "__v": 0
      },
      "dateTime": "2023-06-02T00:00:00.000Z",
      "amount": 10,
      "cashbackAmount": 0.01,
      "cashbackCategory": "dining",
      "createdAt": 1689911338989,
      "updatedAt": 1689911338989,
      "__v": 0
    }
  ]
}
```
