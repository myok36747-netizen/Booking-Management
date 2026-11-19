import type { BookingStatus } from "@/types/booking";

export const TEST_FEE = 10000;
export const SLOT_MINUTES = 45;
export const MAX_SLIP_SIZE_MB = 5;

export const PAYMENT_METHODS = [
  "KBZPay",
  "Wave Pay",
  "AYA Pay",
  "CB Pay",
  "Bank Transfer",
] as const;

export const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
  enrolled: "Enrolled",
};

/** Tailwind classes (colors are defined as theme tokens in globals.css) */
export const STATUS_TEXT_CLASS: Record<BookingStatus, string> = {
  pending: "text-status-pending",
  accepted: "text-status-accepted",
  rejected: "text-status-rejected",
  enrolled: "text-status-enrolled",
};

/** Enrolled bookings are final and can no longer be edited */
export const isEditable = (status: BookingStatus) => status !== "enrolled";
