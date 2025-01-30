import type { ActionFunction } from "@remix-run/node";
import { PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { dynamoClient, ensureTableExists } from "~/utils/db.server";

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

    console.log("experienceId", experienceId);
    console.log("userId", userId);

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

export const loader = async () => {
  await ensureTableExists();

  try {
    const response = await dynamoClient.send(
      new QueryCommand({
        TableName: "Bookings",
      })
    );

    const bookings = response.Items?.map((item) => unmarshall(item)) || [];

    return new Response(JSON.stringify(bookings), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Response("Failed to fetch bookings", { status: 500 });
  }
};
