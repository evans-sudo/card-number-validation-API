# Card Number Validation API

## 1. Project Overview
The Card Number Validation API is a lightweight microservice built to validate credit card numbers using the Luhn algorithm. It accepts a card number via a RESTful HTTP POST endpoint and determines if it structurally conforms to the Luhn checksum formula.

## 2. Technology Stack
- **Runtime**: Node.js
- **Framework**: NestJS
- **Language**: TypeScript
- **Validation**: `class-validator` / `class-transformer`
- **Testing**: Vitest (Unit & E2E)

## 3. Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

## 4. Installation Instructions
Clone the repository and install the dependencies:
```bash
npm install
```

## 5. How to Run in Development
To start the application in development mode with hot-reloading:
```bash
npm run start:dev
```
By default, the application runs on port `3000`.

## 6. How to Run Tests
The project uses Vitest for both unit and end-to-end (E2E) testing.
- **Unit Tests**:
  ```bash
  npm run test
  ```
- **E2E Tests**:
  ```bash
  npm run test:e2e
  ```

## 7. API Endpoint Documentation
### `POST /cards/validate`
Validates a provided credit card number against the Luhn algorithm.

**Request Header**:
- `Content-Type: application/json`

**Request Body** (JSON):
- `cardNumber` (string, required, max length: 30)

## 8. Example Request
```bash
curl -X POST http://localhost:3000/cards/validate \
     -H "Content-Type: application/json" \
     -d '{"cardNumber": "4111 1111 1111 1111"}'
```

## 9. Example Successful Response
Returned when the card number is structurally valid according to the Luhn algorithm.
**Status**: `200 OK`
```json
{
  "valid": true
}
```

## 10. Example Invalid-Card Response
Returned when the card number is correctly formatted but fails the Luhn checksum.
**Status**: `200 OK`
```json
{
  "valid": false
}
```

## 11. Example Malformed-Request Response
Returned when the request is missing the `cardNumber`, is of the wrong type, contains letters/invalid symbols, or exceeds the length limit.
**Status**: `400 Bad Request`
```json
{
  "message": [
    "cardNumber must be a string"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
```

## 12. Validation Approach
The API employs a multi-layered validation strategy:
1. **Request Boundary (DTO)**: `class-validator` ensures the payload contains a `cardNumber` property that is a string and under 30 characters.
2. **Service Normalization**: Strips allowed formatting characters (spaces, hyphens) and ensures the remaining string consists entirely of digits.
3. **Algorithmic Validation**: Applies the Luhn algorithm to the normalized digit string.

## 13. Explanation of the Luhn Algorithm
The Luhn algorithm (or mod 10 algorithm) is a simple checksum formula used to validate various identification numbers, such as credit card numbers. 
At a high level, it works by:
1. Reversing the order of the digits.
2. Doubling every second digit.
3. If doubling results in a number greater than 9, subtracting 9 (or adding the digits of the product).
4. Summing all the resulting digits.
5. If the total modulo 10 is equal to 0, the number is valid.

## 14. Input Normalization Behavior
To provide a seamless developer experience, the API supports formatted input. Before processing, the application automatically:
- Removes all spaces (` `).
- Removes all hyphens (`-`).

If any other non-numeric characters (like letters or punctuation) are present after normalization, the API immediately throws a `400 Bad Request`.

## 15. HTTP Status Code Decisions
- **`200 OK`**: Used for all successfully processed requests, *even if the card fails the Luhn check*. A card failing the Luhn check is a valid business logic outcome, not an API or client error.
- **`400 Bad Request`**: Used exclusively when the client sends malformed data (e.g., missing fields, wrong data types, or invalid characters like letters).

## 16. Architecture / Project Structure
The project follows standard NestJS modular architecture:
- `CardsController`: Handles HTTP requests, delegates to the service, and formats responses.
- `CardsService`: Coordinates business logic (normalization and calling the validation utility).
- `LuhnUtil`: A pure function containing the mathematical implementation of the Luhn algorithm.
- `ValidateCardDto`: Defines the expected shape and basic rules of the incoming request.

## 17. Design Decisions
- **Separation of Concerns**: The Luhn algorithm is kept as a pure utility function (`luhn.util.ts`), decoupled from NestJS injectables. This makes it highly testable and reusable.
- **Whitelist DTOs**: The global validation pipe uses `whitelist: true` to automatically strip out unrecognized properties from incoming requests, preventing mass-assignment vulnerabilities.

## 18. Security Considerations
- **Payload Limits**: The `MaxLength(30)` decorator on the DTO prevents arbitrary-length strings from being processed, protecting the server from memory exhaustion or Regular Expression Denial of Service (ReDoS) during normalization.
- **Strict Typing**: TypeScript and strict `class-validator` rules ensure only strings are processed, preventing runtime crashes from unexpected types (e.g., Objects or Arrays passed into string manipulation functions).

## 19. Limitations
**CRITICAL DISCLAIMER**: This API strictly performs *structural validation* using the Luhn algorithm. 

**It does NOT prove that a card is:**
- Real or exists in any banking database.
- Active or unexpired.
- Funded or capable of making transactions.
- Belonging to the person using it.

This service is only useful for catching typos or accidental data entry errors before sending the number to an actual payment processor (like Stripe or Braintree) for authorization.
