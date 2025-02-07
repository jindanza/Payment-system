# Payment System API Documentation

This document provides information on how to use the Payment System API with Postman.

## Postman Collection and Environments

This API uses a Postman collection and environment variables for easier testing and documentation.

### Environments

Two environments are available:

- **local-payment-system.postman_environment.json:** This environment defines variables for running the API on your local machine. It sets the `base_url` to http://localhost:3000.

- **railway-payment-system.postman_environment.json:** This environment defines variables for accessing the API deployed on Railway. It sets the `base_url` to https://payment-system-production-ae99.up.railway.app.

Both environments have a `base_url` variable that needs to be updated with the actual base URL of your API.

**How to use:**

1.  Import the environment files (`local-payment-system.postman_environment.json` and `railway-payment-system.postman_environment.json`) into Postman.
2.  Select the appropriate environment before running requests.

### Collection

`payment-system.postman_collection.json` is a collection contains a set of pre-built requests for interacting with the Payment System API. It covers various functionalities such as user registration, login, profile management, information retrieval, and transaction processing.

**How to use:**

1.  Import the collection file (`payment-system.postman_collection.json`) into Postman.
2.  Ensure you have selected the correct environment.
3.  Run the requests in the collection to test the API.

## API Endpoints

The following endpoints are available in the API:

### Membership

- **Registration:** `POST {{base_url}}/membership/registration`
  - Registers a new user.
  - Request body:
    ```json
    {
      "email": "jindan@gmail.com",
      "first_name": "Muhammad",
      "last_name": "Jindan",
      "password": "12345678"
    }
    ```
- **Login:** `POST {{base_url}}/membership/login`
  - Logs in an existing user.
  - Request body:
    ```json
    {
      "email": "jindan@gmail.com",
      "password": "12345678"
    }
    ```
- **Update Profile:** `PUT {{base_url}}/membership/profile`
  - Updates the user's profile information.
  - Requires Bearer Token authentication.
  - Request body:
    ```json
    {
      "first_name": "Muhammad edit",
      "last_name": "Jindan edit"
    }
    ```
- **Update Image Profile:** `PUT {{base_url}}/membership/profile/image`
  - Updates the user's profile image.
  - Requires Bearer Token authentication.
  - Request body: `form-data` with `profile_image` as a file.
- **Profile:** `GET {{base_url}}/membership/profile`
  - Retrieves the user's profile information.
  - Requires Bearer Token authentication.

### Information

- **Banner:** `GET {{base_url}}/information/banner`
  - Retrieves banner information.
  - Requires Bearer Token authentication.
- **Services:** `GET {{base_url}}/information/services`
  - Retrieves service information.
  - Requires Bearer Token authentication.

### Transaction

- **Balance:** `GET {{base_url}}/transaction/balance`
  - Retrieves the user's balance.
  - Requires Bearer Token authentication.
- **Topup:** `POST {{base_url}}/transaction/topup`
  - Adds funds to the user's balance.
  - Requires Bearer Token authentication.
  - Request body:
    ```json
    {
      "top_up_amount": 100000
    }
    ```
- **Transaction:** `POST {{base_url}}/transaction/transaction`
  - Performs a transaction.
  - Requires Bearer Token authentication.
  - Request body:
    ```json
    {
      "service_code": "PAJAK"
    }
    ```
- **Transaction History:** `GET {{base_url}}/transaction/transaction/history`
  - Retrieves the user's transaction history.
  - Requires Bearer Token authentication.
  - Query parameters:
    - `limit`: Number of transactions to retrieve.
    - `offset`: Offset for pagination.

### Welcome

- **Welcome:** `GET {{base_url}}/`
  - A simple welcome message.

## Authentication

Some endpoints require Bearer Token authentication. To obtain a token, you need to successfully log in using the `POST {{base_url}}/membership/login` endpoint. The token will be returned in the response and can be used in subsequent requests by including it in the `Authorization` header as `Bearer <token>`.

**Note:** Replace `<token>` with the actual token received from the login response.

This documentation provides a basic overview of the Payment System API. Refer to the Postman collection for detailed request and response examples.