# Fanzoo Coding Exercise

A React Remix application demonstrating a booking flow for athlete experiences using DynamoDB.

## Tech Stack

- React Remix
- AWS DynamoDB (local)
- Tailwind CSS
- TypeScript

## Setup & Installation

### 1. Start DynamoDB Local

First, start the local DynamoDB instance:

```bash
docker compose up
```

### 2. Initialize DynamoDB Table

The Table should initialize in the dockerfile volume, if you get an error you can itilialize with this command

```bash
chmod +x docker/dynamodb-init/init.sh
AWS_ACCESS_KEY_ID=dummy AWS_SECRET_ACCESS_KEY=dummy AWS_REGION=localhost ./docker/dynamodb-init/init.sh
```

Verify the table was created:

```bash
aws dynamodb list-tables --endpoint-url http://localhost:8000
```

### 3. Start the Development Server

```bash
npm install
npm run dev
```

Visit `http://localhost:` to view the application.

## Features

### Backend

- RESTful API endpoint (`POST /api/bookings`) for creating bookings
- Mock payment processing with simulated delays and failures
- DynamoDB integration for storing booking records
- Data validation and error handling

### Frontend

- Display of athlete experiences with details and pricing
- Booking flow with confirmation modal
- Success/error handling with user feedback
- Responsive design with Tailwind CSS

## Testing the Application

1. Browse the available experiences on the home page
2. Click "Book Now" on an experience (requires login)
3. Confirm the booking in the modal
4. Test error scenarios using the "Test Failed Payment" button

## API Specification

### Create Booking

```
POST /api/bookings

Request Body:
{
  "experienceId": string,
  "userId": string,
  "shouldFail": boolean (optional)
}

Response:
{
  "id": string,
  "userId": string,
  "experienceId": string,
  "status": string,
  "createdAt": string,
  "updatedAt": string
}
```
