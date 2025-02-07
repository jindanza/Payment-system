# Payment System API Documentation

This document provides information about the Payment System API, including endpoints, request methods, and data formats.

## Base URL

`http://localhost:3000`

## Endpoints

### Membership

#### Registration

* **Endpoint:** `/membership/registration`
* **Method:** POST
* **Request Body:**
    ```json
    {
      "email": "jindan@gmail.com",
      "first_name": "Muhammad",
      "last_name": "Jindan",
      "password": "12345678"
    }
    ```
* **Description:** Registers a new user in the system.

#### Login

* **Endpoint:** `/membership/login`
* **Method:** POST
* **Request Body:**
    ```json
    {
      "email": "jindan@gmail.com",
      "password": "12345678"
    }
    ```
* **Description:** Authenticates a user and returns a bearer token.

#### Update Profile

* **Endpoint:** `/membership/profile`
* **Method:** PUT
* **Headers:**
    * `Authorization: Bearer <token>`
* **Request Body:**
    ```json
    {
      "first_name": "Muhammad profile",
      "last_name": "Jindan profile"
    }
    ```
* **Description:** Updates the user's profile information.

#### Update Image Profile

* **Endpoint:** `/membership/profile/image`
* **Method:** PUT
* **Headers:**
    * `Authorization: Bearer <token>`
* **Request Body:**
    * `profile_image`: (file)
* **Description:** Updates the user's profile image.

#### Profile

* **Endpoint:** `/membership/profile`
* **Method:** GET
* **Headers:**
    * `Authorization: Bearer <token>`
* **Description:** Retrieves the user's profile information.

### Information

#### Banner

* **Endpoint:** `/information/banner`
* **Method:** GET
* **Headers:**
    * `Authorization: Bearer <token>`
* **Description:** Retrieves banner information.

#### Services

* **Endpoint:** `/information/services`
* **Method:** GET
* **Headers:**
    * `Authorization: Bearer <token>`
* **Description:** Retrieves information about available services.

### Transaction

#### Balance

* **Endpoint:** `/transaction/balance`
* **Method:** GET
* **Headers:**
    * `Authorization: Bearer <token>`
* **Description:** Retrieves the user's current balance.

#### Topup

* **Endpoint:** `/transaction/topup`
* **Method:** POST
* **Headers:**
    * `Authorization: Bearer <token>`
* **Request Body:**
    ```json
    {
      "top_up_amount": 100000
    }
    ```
* **Description:** Adds funds to the user's balance.

#### Transaction

* **Endpoint:** `/transaction/transaction`
* **Method:** POST
* **Headers:**
    * `Authorization: Bearer <token>`
* **Request Body:**
    ```json
    {
      "service_code": "PAKET_DATA"
    }
    ```
* **Description:** Performs a transaction using the specified service code.

#### Transaction History

* **Endpoint:** `/transaction/transaction/history`
* **Method:** GET
* **Headers:**
    * `Authorization: Bearer <token>`
* **Query Parameters:**
    * `limit`: (optional) Number of transactions to retrieve.
    * `offset`: (optional) Offset for pagination.
* **Description:** Retrieves the user's transaction history.

### Welcome

* **Endpoint:** `/`
* **Method:** GET
* **Description:**  A welcome endpoint, likely for testing or displaying a basic message.

## Authentication

Most endpoints require Bearer token authentication. You can obtain a token by logging in using the `/membership/login` endpoint.

## Example Usage

```bash
curl -X POST \
  http://localhost:3000/membership/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "jindan@gmail.com",
    "password": "12345678"
  }'
```