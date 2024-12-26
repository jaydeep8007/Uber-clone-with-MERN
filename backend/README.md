# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON response with the user details and an authentication token.

### Request Body:

The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters.
  - `lastname`: A string with a minimum length of 3 characters.
- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: POST

### Description:

This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON response with an authentication token and user details if the credentials are valid.

### Request Body:

The request body should be a JSON object with the following fields:

- `email`: A valid email address.
- `password`: A string with a minimum length of 6 characters.

Example:

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: GET

### Description:

This endpoint is used to get the profile of the authenticated user. It returns the user details.

### Request Headers:

- `Authorization`: Bearer token

### Response:

#### Success (200 OK):

- Status Code: 200
- Response Body:

  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": ""
  }
  ```

  # User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: GET

### Description:

This endpoint is used to log out the authenticated user. It clears the authentication token and blacklists it.

### Request Headers:

- `Authorization`: Bearer token

### Response:

#### Success (200 OK):

- Status Code: 200
- Response Body:
  ```json
  {
    "message": "Logged out"
  }
  ```
