# API References for Jarvis

## Overview
This document provides detailed information about the API endpoints available in the Personal AI Agent (Jarvis).

## Authentication
All requests to the API must include a valid JWT token in the Authorization header. The format should be:
```
Authorization: Bearer <token>
```

## Endpoints
### 1. User Registration
- **Method**: `POST`
- **Path**: `/register`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```
- **Response**:
  ```json
  {
      "username": "string"
  }
  ```

### 2. User Login
- **Method**: `POST`
- **Path**: `/login`
- **Description**: Logs in a user and returns a JWT token.
- **Request Body**:
  ```json
  {
      "username": "string",
      "password": "string"
  }
  ```
- **Response**:
  ```json
  {
      "auth": true,
      "token": "string"
  }
  ```

### 3. Fetch Emails
- **Method**: `GET`
- **Path**: `/fetch-emails`
- **Description**: Fetches emails for the authenticated user.
- **Response**:
  ```json
  [
      {
          "id": "integer",
          "subject": "string",
          "body": "string",
          "timestamp": "string"
      }
  ]
  ```

### 4. Generate Email Response
- **Method**: `POST`
- **Path**: `/generate-response`
- **Description**: Generates a response for a given email content.
- **Request Body**:
  ```json
  {
      "emailContent": "string"
  }
  ```
- **Response**:
  ```json
  {
      "response": "string"
  }
  ```

### 5. Create Calendar Event
- **Method**: `POST`
- **Path**: `/create-event`
- **Description**: Creates a new calendar event.
- **Request Body**:
  ```json
  {
      "title": "string",
      "date": "string",
      "time": "string"
  }
  ```
- **Response**:
  ```json
  {
      "eventId": "string"
  }
  ```

## Conclusion
This document serves as a reference for developers to understand the API endpoints available in the Jarvis project.