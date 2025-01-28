import type { ActionFunction } from "@remix-run/node";
import {
  DynamoDBClient,
  PutItemCommand,
  CreateTableCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";

const dynamoClient = new DynamoDBClient({
  region: "localhost",
  endpoint: "http://localhost:8000", // Point to local DynamoDB
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

async function ensureTableExists() {
  try {
    await dynamoClient.send(
      new CreateTableCommand({
        TableName: "Bookings",
        AttributeDefinitions: [
          { AttributeName: "id", AttributeType: "S" },
          { AttributeName: "userId", AttributeType: "S" },
        ],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        GlobalSecondaryIndexes: [
          {
            IndexName: "UserIdIndex",
            KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
            Projection: { ProjectionType: "ALL" },
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      })
    );
    console.log("Table created successfully");
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== "ResourceInUseException") {
      throw error;
    }
  }
}

export const action: ActionFunction = async ({ request }) => {
  await ensureTableExists();

  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  try {
    const { experienceId, userId, shouldFail } = await request.json();

    await new Promise((resolve) =>
      setTimeout(resolve, 3000 + Math.random() * 2000)
    );

    if (shouldFail) {
      throw new Response("Payment processing failed", { status: 400 });
    }

    if (!experienceId || !userId) {
      throw new Response("Experience ID and User ID are required", {
        status: 400,
      });
    }

    const booking = {
      id: uuidv4(),
      userId,
      experienceId,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await dynamoClient.send(
      new PutItemCommand({
        TableName: "Bookings",
        Item: marshall(booking),
      })
    );

    return new Response(JSON.stringify(booking), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Booking error:", error);
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Failed to create booking", { status: 500 });
  }
};
