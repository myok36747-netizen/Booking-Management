export type BookingStatus = "pending" | "accepted" | "rejected" | "enrolled";

export interface Booking {
  id: string;
  studentName: string;
  parentName: string;
  /** ISO date, yyyy-mm-dd */
  dob: string;
  phone: string;
  /** ISO date, yyyy-mm-dd */
  bookingDate: string;
  /** 24h time, HH:mm */
  bookingTime: string;
  charges: number;
  paymentMethod: string;
  paymentSlipName: string | null;
  /** Object URL for a slip uploaded in this session (kept in memory only) */
  paymentSlipUrl: string | null;
  status: BookingStatus;
  zoomLink?: string;
}

/** Fields the user can submit from the form */
export type BookingInput = Omit<Booking, "id" | "status" | "zoomLink">;
