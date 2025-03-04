# REST API with Koa.js

## Overview
This project is a REST API built using **Koa.js**. The API follows best practices for building scalable and maintainable services.

## Features
- RESTful endpoints
- Middleware-based architecture
- JSON request/response handling
- Error handling and validation
- User authentication (Sign Up, Sign In, Sign Out)
- Authorization using JWT
- Lightweight and efficient

## Technologies Used
- **Node.js** (JavaScript runtime)
- **Koa.js** (Web framework)
- **Joi** (Request validation)
- **Dotenv** (Environment variables)
- **Bcrypt** (Password hashing)
- **JsonWebToken** (JWT) (Authentication and authorization)
- **Koa-Bodyparser** (Request body parsing)
- **Koa-Router** (Routing)

## Authentication & Authorization

This API uses **JWT (JSON Web Tokens)** for authentication and authorization.

- **Sign-up (`/api/auth/signup`)**: Registers a new user and hashes the password using bcrypt.
  - Request Body:
    ```json
    {
      "username": "example",
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "user": { "id": "12345", "username": "example", "email": "user@example.com" }
    }
    ```

- **Sign-in (`/api/auth/signin`)**: Authenticates the user and returns a JWT token.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

- **Sign-out (`/api/auth/signout`)**: Logs out the user by invalidating the token (handled with token blacklisting and cookies).
  - Response:
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

- **Protected Routes**: Requires a valid JWT in the `Authorization` header (`Bearer <token>`).

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation
### Clone the repository
```sh
git clone https://github.com/hristova9/rest-api-koa.git
cd rest-api-koa
```

### Install dependencies
```sh
npm install
# or
yarn install
```

### Set up environment variables
Create a `.env` file in the root directory and add necessary environment variables (if applicable):
```ini
PORT=3030
```

### Run the server
```sh
npm run dev
# or
yarn run dev
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **GET** | `/users` | Get all users (available for all users) |
| **GET** | `/users/:id` | Get user by ID (available for all users) |
| **POST** | `/users` | Create a new user (not allowed - available in sign-up) |
| **PUT** | `/users/:id` | Update user details (available for the same user only)|
| **DELETE** | `/users/:id` | Delete a user (available for the same user only)|
| **GET** | `/posts` | Get all posts (available for all users)|
| **GET** | `/posts/:id` | Get post by ID (available for all users)|
| **POST** | `/posts` | Create a new post (available only for the owner)|
| **PUT** | `/posts/:id` | Update post details (available only for the owner)|
| **DELETE** | `/posts/:id` | Delete a post (available only for the owner)|

## Usage
Use [Postman](https://www.postman.com/) or `curl` to test API endpoints.
Example request:
```sh
curl -X GET http://localhost:3030/users
```