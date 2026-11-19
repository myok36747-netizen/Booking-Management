import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Booking } from "@/types/booking";
import { isEditable } from "@/lib/constants";
import { formatDate, formatTimeRange } from "@/lib/format";
import { EditDocIcon } from "./Icons";
import { StatusBadge } from "./StatusBadge";

function InfoItem({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Image src={icon} alt="" width={18} height={18} className="mt-0.5" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <div className="text-sm font-semibold">{children}</div>
      </div>
    </div>
  );
}

export function BookingCard({ booking }: { booking: Booking }) {
  const editable = isEditable(booking.status);

  return (
    <article className="relative rounded-xl border border-line bg-white px-5 py-5 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <Image
          src="/images/icon.png"
          alt=""
          width={96}
          height={96}
          className="h-24 w-24 shrink-0 object-contain"
        />

        <div className="grid flex-1 gap-x-10 gap-y-4 sm:max-w-xl sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium leading-tight text-black">{booking.studentName}</h2>
            <p className="text-xs text-muted">{booking.parentName}</p>
          </div>

          <InfoItem icon="/images/main.png" label="Status">
            <StatusBadge status={booking.status} />
          </InfoItem>

          <InfoItem icon="/images/date.png" label="Date">
            {formatDate(booking.bookingDate)}
          </InfoItem>

          <InfoItem icon="/images/time.png" label="Time">
            {formatTimeRange(booking.bookingTime)}
          </InfoItem>
        </div>
      </div>

      <div className="absolute right-5 top-4 flex items-center gap-4 sm:right-10 sm:top-5">
        {editable &&
          (booking.status === "accepted" ? (
            <Link
              href={`/update/${booking.id}`}
              aria-label={`Edit booking for ${booking.studentName}`}
              title="Edit"
              className="text-status-enrolled"
            >
              <EditDocIcon className="h-6 w-6" />
            </Link>
          ) : (
            <Link
              href={`/update/${booking.id}`}
              aria-label={`Edit booking for ${booking.studentName}`}
              title="Edit"
            >
              <Image src="/images/edit.png" alt="" width={24} height={24} />
            </Link>
          ))}
        <Link
          href={`/bookings/${booking.id}`}
          aria-label={`View booking for ${booking.studentName}`}
          title="View"
        >
          <Image src="/images/view.png" alt="" width={24} height={24} />
        </Link>
      </div>
    </article>
  );
}
