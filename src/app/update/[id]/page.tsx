"use client";

import { useParams } from "next/navigation";
import { BookingForm } from "@/components/BookingForm";
import { NotFoundCard } from "@/components/NotFoundCard";
import { PageHeader } from "@/components/PageHeader";
import { useBookings } from "@/context/BookingContext";
import { isEditable } from "@/lib/constants";

export default function UpdateBookingPage() {
  const { id } = useParams<{ id: string }>();
  const { getBooking } = useBookings();
  const booking = getBooking(id);

  return (
    <>
      <PageHeader title="Update Booking Information" />
      {!booking ? (
        <NotFoundCard message="Booking not found. Data is kept in memory only, so it resets when the page is refreshed." />
      ) : !isEditable(booking.status) ? (
        <NotFoundCard message="Enrolled bookings can no longer be edited." />
      ) : (
        // key resets the form's local state if the user switches to another booking
        <BookingForm key={booking.id} mode="update" booking={booking} />
      )}
    </>
  );
}
