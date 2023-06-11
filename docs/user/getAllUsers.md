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
| `password`  | string | Password of the user                              |
| `createdAt` | number | Timestamp of when the user was created (in epoch) |
| `updatedAt` | number | Timestamp of when the user was updated (in epoch) |
| `__v`       | number | Version of the user                               |

#### Example

```json
{
  "status": "OK",
  "data": [
    {
      "_id": "e92f852d-06e7-4572-baa3-ef105918e15e",
      "name": "Jang Man Wol",
      "email": "jmwl160493@kakaot.com",
      "password": "P@ssw0rd",
      "createdAt": 1686467427069,
      "updatedAt": 1686467427069,
      "__v": 0
    },
    {
      "_id": "ee942760-9582-4bdf-a4d8-1df3ef8e4dd3",
      "name": "Sanchez",
      "email": "sanchez@pizzaalvolo.com",
      "password": "Veronica@123",
      "createdAt": 1686467492406,
      "updatedAt": 1686467492406,
      "__v": 0
    },
    {
      "_id": "2b92ed5f-08ff-42e4-8437-6cf4fb2901d3",
      "name": "Sunny",
      "email": "kimsun@goblinchiken.com",
      "password": "KimW00B$n",
      "createdAt": 1686467522267,
      "updatedAt": 1686467522267,
      "__v": 0
    }
  ]
}
```
