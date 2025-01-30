export interface Booking {
  id: string;
  userId: string;
  experienceId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface GetBookingsProps {
  bookings: Booking[];
}

export default function GetBookings({ bookings }: GetBookingsProps) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">Booking ID: {booking.id}</h3>
              <p className="text-gray-600">
                Created: {new Date(booking.createdAt).toLocaleDateString()}
              </p>
              <p className="mt-2">
                Status: <span className="font-semibold">{booking.status}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Experience ID: {booking.experienceId}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                User ID: {booking.userId}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
