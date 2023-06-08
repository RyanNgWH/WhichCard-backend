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
| `id`        | string | ID of the user (UUID)                             |
| `name`      | string | Full name of the user                             |
| `email`     | string | Email of the user                                 |
| `password`  | string | Password of the user                              |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |

#### Example

```json
{
  "status": "OK",
  "data": [
    {
      "id": "61dbae02-c147-4e28-863c-db7bd402b2d6",
      "name": "Jang Man Wol",
      "email": "jmwl160493@kakaot.com",
      "password": "P@ssw0rd",
      "createdAt": 1685203200000,
      "updatedAt": 1685203200000
    },
    {
      "id": "4a3d9aaa-608c-49a7-a004-66305ad4ab50",
      "name": "Sanchez",
      "email": "sanchez@pizzaalvolo.com",
      "password": "veronica123",
      "createdAt": 1685203502000,
      "updatedAt": 1685203502000
    },
    {
      "id": "d8be2362-7b68-4ea4-a1f6-03f8bc4eede7",
      "name": "Sunny",
      "email": "kimsun@goblinchiken.com",
      "password": "kimwoobin",
      "createdAt": 1685203572000,
      "updatedAt": 1685211240000
    }
  ]
}
```
