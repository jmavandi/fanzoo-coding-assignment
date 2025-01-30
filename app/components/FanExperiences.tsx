import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { experiences, Experience } from "experiences";
import { useNavigate, useSearchParams } from "@remix-run/react";

export default function FanExperiences() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLoggedIn = searchParams.get("logged_in") === "true";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [bookingStatus, setBookingStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBookNow = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedExperience) return;
    setIsLoading(true);
    setBookingStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceId: selectedExperience.id,
          userId: "test-user-id",
          shouldFail: false,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      setBookingStatus("success");
      setIsModalOpen(false);
      navigate("?logged_in=true", { replace: true });
    } catch (error) {
      setBookingStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to book experience. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestFailedPayment = async () => {
    if (!selectedExperience) return;
    setIsLoading(true);
    setBookingStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceId: selectedExperience.id,
          userId: "test-user-id",
          shouldFail: true,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (error) {
      setBookingStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Payment processing failed. Please try a different payment method."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (bookingStatus === "success") {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-8 bg-green-50 border border-green-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-2xl font-bold text-green-800">
            Booking Confirmed!
          </h2>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="pb-4 border-b border-green-200">
            <p className="text-sm uppercase text-gray-500">Experience</p>
            <p className="text-lg font-semibold mt-1">
              {selectedExperience?.title}
            </p>
          </div>

          <div className="pb-4 border-b border-green-200">
            <p className="text-sm uppercase text-gray-500">Athlete</p>
            <p className="text-lg font-semibold mt-1">
              {selectedExperience?.athleteName}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-500">Price</p>
            <p className="text-lg font-semibold mt-1">
              ${selectedExperience?.price}
            </p>
          </div>

          <button
            onClick={() => setBookingStatus("idle")}
            className="mt-8 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Experiences
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Fan Experiences</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="border rounded-lg p-6 shadow-sm relative"
          >
            {experience.imageUrl && (
              <img
                src={experience.imageUrl}
                alt={`${experience.athleteName}`}
                className="absolute top-6 right-6 w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="pr-28">
              <h2 className="text-xl font-bold">{experience.title}</h2>
              <p className="text-gray-600 mt-2">
                with {experience.athleteName}
              </p>
              <p className="mt-4">{experience.description}</p>
              <p className="text-lg font-semibold mt-4">${experience.price}</p>
              <button
                onClick={() => handleBookNow(experience)}
                disabled={!isLoggedIn}
                className={`mt-4 px-4 py-2 rounded ${
                  isLoggedIn
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoggedIn ? "Book Now" : "Login to Book"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-black rounded-lg p-6 max-w-sm w-full text-white">
            <h2 className="text-xl font-bold">Confirm Booking</h2>

            {bookingStatus === "error" && (
              <p className="text-red-600 mt-2">{errorMessage}</p>
            )}

            <p className="mt-4">
              Are you sure you want to book {selectedExperience?.title} with{" "}
              {selectedExperience?.athleteName}?
            </p>
            <p className="font-semibold mt-2">
              Price: ${selectedExperience?.price}
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleConfirmBooking}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Processing..." : "Confirm"}
              </button>
              <button
                onClick={handleTestFailedPayment}
                disabled={isLoading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                Test Failed Payment
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isLoading}
                className="border border-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
