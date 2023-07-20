# getAllMerchants

## Description

Get all merchants in the database.

## API Endpoint

`GET /merchants`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Succesfully returns all merchants in the database

Returns all merchants in the database.

#### Schema

| Field        | Type   | Description                                                  |
| ------------ | ------ | ------------------------------------------------------------ |
| `_id`        | string | ID of the merchant (UUID)                                    |
| `name`       | string | Merchant name (e.g. "popular", "ikea")                       |
| `prettyName` | string | Merchant name for display (e.g. "Popular Bookstore", "IKEA") |
| `address`    | string | Address of the merchant                                      |
| `mcc`        | number | MCC of the merchant                                          |
| `longitude`  | number | Longitude of the merchant                                    |
| `latitude`   | number | Latitude of the merchant                                     |
| `createdAt`  | number | Timestamp of when the merchant was created (in epoch)        |
| `updatedAt`  | number | Timestamp of when the merchant was updated (in epoch)        |
| `__v`        | number | Version of the merchant                                      |

#### Example

```json
{
  "status": "OK",
  "data": [
    {
      "_id": "38c1eb45-08da-4e5e-9ac6-9924fff7e070",
      "name": "popular",
      "prettyName": "Popular Bookstore",
      "address": "21 Choa Chu Kang Ave 4, #03-13/14, Singapore 689812",
      "mcc": 5942,
      "longitude": 103.74520449016518,
      "latitude": 1.385489034729306,
      "createdAt": 1689847324216,
      "updatedAt": 1689847324216,
      "__v": 0
    },
    {
      "_id": "c1b7ac4b-7d54-4890-88aa-d8129ab7f30c",
      "name": "ikea",
      "prettyName": "IKEA",
      "address": "50 Jurong Gateway Rd, #02-12/13/14 #03-15/16/17, #04-20/21/22, Singapore 608549",
      "mcc": 5712,
      "longitude": 103.74379529629554,
      "latitude": 1.3338875172406766,
      "createdAt": 1689847889757,
      "updatedAt": 1689847889757,
      "__v": 0
    },
    {
      "_id": "d0639628-f9b7-4591-b893-f1c39772114b",
      "name": "ikea_restaurant",
      "prettyName": "IKEA Restaurant",
      "address": "50 Jurong Gateway Rd, #04-20/21/22, Singapore 608549",
      "mcc": 5814,
      "longitude": 103.74366453177412,
      "latitude": 1.3339052098055968,
      "createdAt": 1689848120905,
      "updatedAt": 1689848120905,
      "__v": 0
    }
  ]
}
```
