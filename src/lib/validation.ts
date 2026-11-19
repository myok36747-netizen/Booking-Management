import { MAX_SLIP_SIZE_MB } from "./constants";
import { todayISO } from "./format";

export interface SlipValue {
  name: string;
  /** null when the slip is an existing one with no preview in memory */
  url: string | null;
  size?: number;
}

export interface FormValues {
  studentName: string;
  parentName: string;
  dob: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  /** Kept as a string while the user types; converted to a number on submit */
  charges: string;
  paymentMethod: string;
  paymentSlip: SlipValue | null;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

/** Accepts 09xxxxxxxxx, +959xxxxxxxxx or 959xxxxxxxxx (7-9 digits after the 9) */
const MM_PHONE = /^(?:\+?95|0)9\d{7,9}$/;

export function validate(
  values: FormValues,
  mode: "create" | "update",
): FormErrors {
  const errors: FormErrors = {};

  if (!values.studentName.trim())
    errors.studentName = "Student name is required";
  if (!values.parentName.trim()) errors.parentName = "Parent name is required";

  // In update mode these three fields are locked, so they are not re-validated.
  if (mode === "create") {
    const today = todayISO();

    if (!values.dob) errors.dob = "Date of birth is required";
    else if (values.dob >= today)
      errors.dob = "Date of birth must be in the past";

    if (!values.bookingDate) errors.bookingDate = "Booking date is required";
    else if (values.bookingDate < today)
      errors.bookingDate = "Booking date cannot be in the past";

    if (!values.bookingTime) errors.bookingTime = "Booking time is required";
  }

  const phone = values.phone.replace(/[\s-]/g, "");
  if (!phone) errors.phone = "Phone number is required";
  else if (!MM_PHONE.test(phone))
    errors.phone = "Enter a valid Myanmar phone number (e.g. 09797122499)";

  const chargesNumber = Number(values.charges.replace(/,/g, ""));
  if (!values.charges.trim()) errors.charges = "Charges is required";
  else if (!Number.isFinite(chargesNumber) || chargesNumber <= 0)
    errors.charges = "Enter a valid amount";

  if (!values.paymentMethod)
    errors.paymentMethod = "Please choose a payment method";

  if (!values.paymentSlip)
    errors.paymentSlip = "Please upload your payment slip";
  else if (
    values.paymentSlip.size &&
    values.paymentSlip.size > MAX_SLIP_SIZE_MB * 1024 * 1024
  )
    errors.paymentSlip = `File must be smaller than ${MAX_SLIP_SIZE_MB} MB`;

  return errors;
}
