# getMerchantById

## Description

Get a merchant by id.

## API Endpoint

`GET /merchants/:merchantId`

## Query Parameters

| Field        | Type | Description               | Required |
| ------------ | ---- | ------------------------- | -------- |
| `merchantId` | UUID | ID of the merchant (UUID) | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Succesfully returns the merchant

Successfully returns the merchant with the given id.

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
  "data": {
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
      "value": "38c1eb45-08da-4e5e-9ac6-9924fff7e07s",
      "msg": "merchantId must be a UUID",
      "path": "merchantId",
      "location": "params"
    }
  ]
}
```

### 404 Not Found - Unable to find merchant

Request body valid. However, the merchant is unable to be found in the database.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Not Found",
  "data": {
    "error": "Merchant with id '38c1eb45-08da-4e5e-9ac6-9924fff7e071' not found."
  }
}
```
