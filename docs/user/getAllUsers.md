# getAllUsers

## Description

Get all users in the database.

## API Endpoint

`GET /users`

## Query Parameters

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Request Body

| Field | Type | Description | Required |
| ----- | ---- | ----------- | -------- |
| -     | -    | -           | -        |

## Responses

### 200 OK - Succesfully returns all users in the database

Returns all users in the database.

#### Schema

| Field       | Type   | Description                                       |
| ----------- | ------ | ------------------------------------------------- |
| `_id`       | string | ID of the user (UUID)                             |
| `name`      | string | Full name of the user                             |
| `email`     | string | Email of the user                                 |
| `password`  | string | Hash (SHA-256) of the password of the user        |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |
| `__v`       | number | Version of the user                               |

#### Example

```json
{
  "status": "OK",
  "data": [
    {
      "_id": "3618ddc6-3c4c-48b3-9dfd-5242b0fbf897",
      "name": "Jang Man Wol",
      "email": "jmwl160493@kakaot.com",
      "password": "b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342",
      "cards": [],
      "createdAt": 1689916468269,
      "updatedAt": 1689916468269,
      "__v": 0
    },
    {
      "_id": "a3cec349-8d87-411e-8430-f3e4e16c8054",
      "name": "Sunny",
      "email": "kimsun@goblinchiken.com",
      "password": "263e895c8882006349e41dc4a09b80ee2d8802d4b85218996cc5dee7bf3bc744",
      "cards": [],
      "createdAt": 1689916611983,
      "updatedAt": 1689916611983,
      "__v": 0
    },
    {
      "_id": "aea01230-7f6a-4e46-acc8-7643f1ea126e",
      "name": "Sanchez",
      "email": "sanchez@pizzaalvolo.com",
      "password": "84d615bdedbcec705efc5e5a90a07b914d0a36d0e56185df29022d8fda22dae6",
      "cards": [],
      "createdAt": 1689916672071,
      "updatedAt": 1689916672071,
      "__v": 0
    }
  ]
}
```
