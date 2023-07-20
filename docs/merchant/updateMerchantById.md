# updateMerchantById

## Description

Updates a merchant by id

## API Endpoint

`PATCH /merchant/:merchantId`

## Query Parameters

| Field        | Type | Description               | Required |
| ------------ | ---- | ------------------------- | -------- |
| `merchantId` | UUID | ID of the merchant (UUID) | ✅       |

## Request Body

| Field        | Type   | Description                                                  | Required |
| ------------ | ------ | ------------------------------------------------------------ | -------- |
| `name`       | string | Merchant name (e.g. "popular", "ikea")                       |          |
| `prettyName` | string | Merchant name for display (e.g. "Popular Bookstore", "IKEA") |          |
| `address`    | string | Address of the merchant                                      |          |
| `mcc`        | number | MCC of the merchant                                          |          |
| `longitude`  | number | Longitude of the merchant                                    |          |
| `latitude`   | number | Latitude of the merchant                                     |          |

> Note: To update the status of the merchant, use the [`createMerchant`](createMerchant.md) or [`deleteMerchantById`](deleteMerchantById.md) endpoints instead.

> Note: Fields not listed here will be ignored

## Response

### 200 OK - Succesfully updates the merchant

Successfully updates and returns the updated merchant with the given id.

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
  "data": {
    "_id": "e7a87fc0-54c8-42f1-b6ae-3dba30e9cbab",
    "name": "popular",
    "prettyName": "Popular Bookstore",
    "address": "21 Choa Chu Kang Ave 4, #03-13/14, Singapore 689812",
    "mcc": 5942,
    "longitude": 103.74516157441636,
    "latitude": 1.3854997604285177,
    "createdAt": 1689858006747,
    "updatedAt": 1689858372086,
    "status": "active",
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
      "value": "1.3854997604285177s",
      "msg": "Latitude must be a float",
      "path": "latitude",
      "location": "body"
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

### 422 Unprocessable Entity - Unable to update merchant

Request body valid. However, the merchant is unable to be updated. This is usually due to a duplicate merchant (same name & latitude,longitude) already existing in the database.

#### Schema

| Field   | Type   | Description                           |
| ------- | ------ | ------------------------------------- |
| `error` | string | Message describing error that occured |

#### Example

```json
{
  "status": "Unprocessable Entity",
  "data": {
    "error": "Merchant with name 'popular' and latitude/longitude '1.3854997604285177,103.74516157441636' already exists."
  }
}
```
