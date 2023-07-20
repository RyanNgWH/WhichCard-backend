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
| `status`     | string | Status of the merchant (active or inactive)                  |
| `__v`        | number | Version of the merchant                                      |

#### Example

```json
{
  "status": "OK",
  "data": [
    {
      "_id": "e7a87fc0-54c8-42f1-b6ae-3dba30e9cbab",
      "name": "popular",
      "prettyName": "Popular Bookstore",
      "address": "21 Choa Chu Kang Ave 4, #03-13/14, Singapore 689812",
      "mcc": 5942,
      "longitude": 103.74516157441636,
      "latitude": 1.3854997604285177,
      "createdAt": 1689858006747,
      "updatedAt": 1689858006747,
      "status": "active",
      "__v": 0
    },
    {
      "_id": "1e836c18-8bb1-432b-b972-e9fdfe2835de",
      "name": "ikea",
      "prettyName": "IKEA",
      "address": "50 Jurong Gateway Rd, #02-12/13/14 #03-15/16/17, #04-20/21/22, Singapore 608549",
      "mcc": 5712,
      "longitude": 103.74379529629554,
      "latitude": 1.3338875172406766,
      "createdAt": 1689858085705,
      "updatedAt": 1689858085705,
      "status": "active",
      "__v": 0
    },
    {
      "_id": "77f8a29c-0913-4faf-9a3e-93508863fb48",
      "name": "ikea_restaurant",
      "prettyName": "IKEA Restaurant",
      "address": "50 Jurong Gateway Rd, #04-20/21/22, Singapore 608549",
      "mcc": 5814,
      "longitude": 103.74366453177412,
      "latitude": 1.3339052098055968,
      "createdAt": 1689858097435,
      "updatedAt": 1689858097435,
      "status": "active",
      "__v": 0
    }
  ]
}
```
