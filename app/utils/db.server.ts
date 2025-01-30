import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";

export const dynamoClient = new DynamoDBClient({
  region: "localhost",
  endpoint: "http://localhost:8000", // Point to local DynamoDB
  credentials: {
    accessKeyId: "dummy",
    secretAccessKey: "dummy",
  },
});

export async function ensureTableExists() {
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
