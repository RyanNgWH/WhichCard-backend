# deleteTransactionById

## Description

Delete a transaction from the database with the given id.

## API Endpoint

`DELETE /transactions/:transactionId`

## Query Parameters

| Field           | Type | Description                  | Required |
| --------------- | ---- | ---------------------------- | -------- |
| `transactionId` | UUID | ID of the transaction (UUID) | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Response

### 204 No Content - Succesfully deletes the transaction

Successfully deletes the transaction with the given id. If the transaction does not exist, the response will still be 204.

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
      "value": "b7e5ff48-e478-427e-8fb9-0670661dc9es",
      "msg": "Transaction ID must be a UUID",
      "path": "transactionId",
      "location": "params"
    }
  ]
}
```
