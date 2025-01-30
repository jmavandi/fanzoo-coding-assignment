import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import FanExperiences from "~/components/FanExperiences";
import GetBookings from "~/components/GetBookings";
import { dynamoClient } from "~/utils/db.server";

export const loader: LoaderFunction = async () => {
  try {
    const response = await dynamoClient.send(
      new ScanCommand({
        TableName: "Bookings",
      })
    );

    const bookings = response.Items?.map((item) => unmarshall(item)) || [];
    const recentBookings = bookings
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3);

    return json({ bookings: recentBookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return json({ bookings: [] });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Fanzoo" },
    { name: "description", content: "Welcome to Fanzoo!" },
  ];
};

export default function Index() {
  const { bookings } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FanExperiences />
      {bookings.length > 0 && <GetBookings bookings={bookings} />}
    </div>
  );
}
