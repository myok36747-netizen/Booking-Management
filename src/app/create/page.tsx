"use client";

import { BookingForm } from "@/components/BookingForm";
import { PageHeader } from "@/components/PageHeader";

export default function CreateBookingPage() {
  return (
    <>
      <PageHeader title="Level Placement Test Booking Information" />
      <BookingForm mode="create" />
    </>
  );
}
