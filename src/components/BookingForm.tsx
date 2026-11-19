"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Booking } from "@/types/booking";
import { TEST_FEE } from "@/lib/constants";
import { validate, type FormErrors, type FormValues } from "@/lib/validation";
import { useBookings } from "@/context/BookingContext";
import {
  DateInput,
  Field,
  FileUpload,
  SelectInput,
  TextInput,
  TimeInput,
} from "./FormControls";
import { InstructionPanel } from "./InstructionPanel";

interface Props {
  mode: "create" | "update";
  booking?: Booking;
}

const EMPTY: FormValues = {
  studentName: "",
  parentName: "",
  dob: "",
  phone: "",
  bookingDate: "",
  bookingTime: "",
  charges: String(TEST_FEE), // default 10000, editable
  paymentMethod: "",
  paymentSlip: null,
};

function initialValues(booking?: Booking): FormValues {
  if (!booking) return EMPTY;
  return {
    studentName: booking.studentName,
    parentName: booking.parentName,
    dob: booking.dob,
    phone: booking.phone,
    bookingDate: booking.bookingDate,
    bookingTime: booking.bookingTime,
    charges: String(booking.charges),
    paymentMethod: booking.paymentMethod,
    paymentSlip: booking.paymentSlipName
      ? { name: booking.paymentSlipName, url: booking.paymentSlipUrl }
      : null,
  };
}

export function BookingForm({ mode, booking }: Props) {
  const router = useRouter();
  const { addBooking, updateBooking } = useBookings();
  const formRef = useRef<HTMLFormElement>(null);

  const isUpdate = mode === "update";
  const [values, setValues] = useState<FormValues>(() =>
    initialValues(booking),
  );
  const [errors, setErrors] = useState<FormErrors>({});

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values, mode);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field once errors have rendered.
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }

    const charges = Number(values.charges.replace(/,/g, ""));
    const slip = values.paymentSlip!;

    if (isUpdate && booking) {
      updateBooking(booking.id, {
        studentName: values.studentName.trim(),
        parentName: values.parentName.trim(),
        phone: values.phone.trim(),
        charges,
        paymentMethod: values.paymentMethod,
        paymentSlipName: slip.name,
        paymentSlipUrl: slip.url,
      });
    } else {
      addBooking({
        studentName: values.studentName.trim(),
        parentName: values.parentName.trim(),
        dob: values.dob,
        phone: values.phone.trim(),
        bookingDate: values.bookingDate,
        bookingTime: values.bookingTime,
        charges,
        paymentMethod: values.paymentMethod,
        paymentSlipName: slip.name,
        paymentSlipUrl: slip.url,
      });
    }
    router.push("/");
  };

  return (
    <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(50,54,83,0.08)] sm:p-8 lg:grid-cols-2 lg:gap-6">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="grid content-start gap-x-5 gap-y-4 sm:grid-cols-2"
      >
        <Field
          label="Student Name"
          htmlFor="studentName"
          error={errors.studentName}
        >
          <TextInput
            id="studentName"
            value={values.studentName}
            onChange={(e) => set("studentName", e.target.value)}
            error={errors.studentName}
            autoComplete="off"
          />
        </Field>

        <Field
          label="Parent Name"
          htmlFor="parentName"
          error={errors.parentName}
        >
          <TextInput
            id="parentName"
            value={values.parentName}
            onChange={(e) => set("parentName", e.target.value)}
            error={errors.parentName}
            autoComplete="off"
          />
        </Field>

        <Field
          label={isUpdate ? "Student's Date of Birth" : "Date of Birth"}
          htmlFor="dob"
          error={errors.dob}
        >
          <DateInput
            id="dob"
            value={values.dob}
            onChange={(e) => set("dob", e.target.value)}
            error={errors.dob}
            disabled={isUpdate}
          />
        </Field>

        <Field
          label={isUpdate ? "Parent Phone No." : "Phone Number"}
          htmlFor="phone"
          error={errors.phone}
        >
          <TextInput
            id="phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
          />
        </Field>

        <Field
          label="Booking Date"
          htmlFor="bookingDate"
          error={errors.bookingDate}
        >
          <DateInput
            id="bookingDate"
            value={values.bookingDate}
            onChange={(e) => set("bookingDate", e.target.value)}
            error={errors.bookingDate}
            disabled={isUpdate}
          />
        </Field>

        <Field
          label={isUpdate ? "Booking Time Slot" : "Booking Time"}
          htmlFor="bookingTime"
          error={errors.bookingTime}
        >
          <TimeInput
            id="bookingTime"
            value={values.bookingTime}
            onChange={(e) => set("bookingTime", e.target.value)}
            error={errors.bookingTime}
            disabled={isUpdate}
          />
        </Field>

        <Field
          label={isUpdate ? "Test Fees" : "Level Placement Test Charges"}
          htmlFor="charges"
          error={errors.charges}
          className="sm:col-span-2"
        >
          <TextInput
            id="charges"
            inputMode="numeric"
            value={values.charges}
            onChange={(e) => set("charges", e.target.value.replace(/\D/g, ""))}
            error={errors.charges}
            className="text-right"
          />
        </Field>

        <Field
          label="Payment Method"
          htmlFor="paymentMethod"
          error={errors.paymentMethod}
          className="sm:col-span-2"
        >
          <SelectInput
            id="paymentMethod"
            value={values.paymentMethod}
            onChange={(v) => set("paymentMethod", v)}
            error={errors.paymentMethod}
            placeholder="please choose payment method"
          />
        </Field>

        <Field
          label="Payment Slip"
          htmlFor="paymentSlip"
          error={errors.paymentSlip}
          className="sm:col-span-2"
        >
          <FileUpload
            id="paymentSlip"
            value={values.paymentSlip}
            onChange={(v) => set("paymentSlip", v)}
            error={errors.paymentSlip}
          />
        </Field>

        <button
          type="submit"
          className={`h-10 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-span-2 ${
            isUpdate ? "bg-secondary" : "bg-primary"
          }`}
        >
          {isUpdate ? "Update Booking" : "Book Test"}
        </button>
      </form>

      <InstructionPanel />
    </div>
  );
}
