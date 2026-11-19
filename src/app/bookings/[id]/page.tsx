"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { NotFoundCard } from "@/components/NotFoundCard";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { useBookings } from "@/context/BookingContext";
import { isEditable } from "@/lib/constants";
import { formatDate, formatMoney, formatTimeRange } from "@/lib/format";

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold">{children || "-"}</dd>
    </div>
  );
}

const isImage = (name: string) => /\.(png|jpe?g|gif|webp|avif)$/i.test(name);

export default function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getBooking } = useBookings();
  const booking = getBooking(id);

  return (
    <>
      <PageHeader title="Booking Details" />
      {!booking ? (
        <NotFoundCard message="Booking not found. Data is kept in memory only, so it resets when the page is refreshed." />
      ) : (
        <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(50,54,83,0.08)] sm:p-8">
          <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            <Detail label="Student Name">{booking.studentName}</Detail>
            <Detail label="Parent Name">{booking.parentName}</Detail>
            <Detail label="Status">
              <StatusBadge status={booking.status} />
            </Detail>
            <Detail label="Date of Birth">{formatDate(booking.dob)}</Detail>
            <Detail label="Parent Phone No.">{booking.phone}</Detail>
            <Detail label="Booking Date">{formatDate(booking.bookingDate)}</Detail>
            <Detail label="Booking Time Slot">{formatTimeRange(booking.bookingTime)}</Detail>
            <Detail label="Test Fees">{formatMoney(booking.charges)}</Detail>
            <Detail label="Payment Method">{booking.paymentMethod}</Detail>
            <Detail label="Payment Slip">{booking.paymentSlipName}</Detail>
          </dl>

          {booking.paymentSlipUrl && booking.paymentSlipName && isImage(booking.paymentSlipName) && (
            // Blob URLs from the browser can't go through next/image optimisation.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={booking.paymentSlipUrl}
              alt={`Payment slip: ${booking.paymentSlipName}`}
              className="mt-6 max-h-80 rounded-lg border border-line object-contain"
            />
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {booking.zoomLink && (booking.status === "accepted" || booking.status === "enrolled") && (
              <a
                href={booking.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white hover:opacity-90"
              >
                Join to Zoom Class
              </a>
            )}
            {isEditable(booking.status) && (
              <Link
                href={`/update/${booking.id}`}
                className="flex h-10 items-center justify-center rounded-md bg-secondary px-6 text-sm font-medium text-white hover:opacity-90"
              >
                Edit Booking
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
