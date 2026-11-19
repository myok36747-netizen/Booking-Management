"use client";

import Link from "next/link";
import { BookingCard } from "@/components/BookingCard";
import { useBookings } from "@/context/BookingContext";

export default function BookingListPage() {
  const { bookings } = useBookings();

  return (
    <>
      <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-medium sm:text-2xl">Booking List</h1>
        <Link
          href="/create"
          className="flex h-8 w-full items-center justify-center rounded-md bg-status-enrolled text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-[400px]"
        >
          Create Booking
        </Link>
      </header>

      {bookings.length === 0 ? (
        <p className="rounded-xl border border-line bg-white p-8 text-center text-sm text-muted">
          No bookings yet. Click “Create Booking” to book a Level Placement Test.
        </p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
