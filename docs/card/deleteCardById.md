# deleteCardById

## Description

Delete a card from the database with the given id. This will also delete all cards in a user's wallet that references the card.

## API Endpoint

`DELETE /cards/:cardId`

## Query Parameters

| Field    | Type | Description           | Required |
| -------- | ---- | --------------------- | -------- |
| `cardId` | UUID | ID of the card (UUID) | ✅       |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Response

### 204 No Content - Succesfully deletes the card

Successfully deletes the card with the given id. All cards in a user's wallet that references the card will also be deleted. If the card does not exist, the response will still be 204.

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
      "value": "9143472b-aeec-4d5d-aee1-797062b76e8",
      "msg": "Card ID must be a UUID",
      "path": "cardId",
      "location": "params"
    }
  ]
}
```
