# createMerchant

## Description

Create a new merchant in the database.

## API Endpoint

`POST /merchants`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field        | Type   | Description                                                  | Required |
| ------------ | ------ | ------------------------------------------------------------ | -------- |
| `name`       | string | Merchant name (e.g. "popular", "ikea")                       | ✅       |
| `prettyName` | string | Merchant name for display (e.g. "Popular Bookstore", "IKEA") | ✅       |
| `address`    | string | Address of the merchant                                      | ✅       |
| `mcc`        | number | MCC of the merchant                                          | ✅       |
| `longitude`  | number | Longitude of the merchant                                    | ✅       |
| `latitude`   | number | Latitude of the merchant                                     | ✅       |

## Responses

### 200 OK - Successfully creates the merchant

Successfully creates the merchant and returns the created merchant.

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
  "status": "Created",
  "data": {
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
      "value": "1.3339052098055968d",
      "msg": "Latitude must be a float",
      "path": "latitude",
      "location": "body"
    }
  ]
}
```

### 422 Unprocessable Entity - Unable to create merchant

Request body valid. However, the merchant is unable to be created. This is usually due to a duplicate merchant (same name, latitude & longitude).

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Merchant with name 'ikea_restaurant' & latitude,longitude of '1.3339052098055968/103.74366453177412' already exists."
  }
}
```
