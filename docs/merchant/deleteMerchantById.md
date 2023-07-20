# deleteMerchantById

## Description

Delete a merchant from the database with the given id. If there are transactions in the database that reference this merchant, the merchant will be marked as deleted instead of removed from the database.

## API Endpoint

`DELETE /merchants/:merchantId`

## Query Parameters

| Field        | Type | Description               | Required |
| ------------ | ---- | ------------------------- | -------- |
| `merchantId` | UUID | ID of the merchant (UUID) | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Response

### 204 No Content - Succesfully deletes the merchant

Successfully deletes the merchant with the given id or marks the merchant as deleted. If the merchant does not exist, the response will still be 204.

> Response body will be empty

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
      "value": "d0639628-f9b7-4591-b893-f1c39772114s",
      "msg": "merchantId must be a UUID",
      "path": "merchantId",
      "location": "params"
    }
  ]
}
```
