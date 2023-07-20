# createMerchant

## Description

Create a new merchant in the database. If merchant already exists & is marked as inactive, the merchant will be marked as active instead of creating a new merchant.

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

Successfully creates the merchant and returns the created merchant. If the merchant already exists & is marked as inactive, the merchant will be marked as active instead of creating a new merchant.

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
  "status": "Created",
  "data": {
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
