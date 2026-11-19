"use client";

import Image from "next/image";
import { useRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { PAYMENT_METHODS } from "@/lib/constants";
import type { SlipValue } from "@/lib/validation";
import { ChevronDownIcon, UploadIcon } from "./Icons";

const baseInput =
  "h-10 w-full rounded-md border bg-white px-3 text-sm outline-none transition-colors " +
  "placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary " +
  "disabled:cursor-default disabled:bg-field disabled:text-muted";

const borderFor = (error?: string) => (error ? "border-status-rejected" : "border-line");

export function Field({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1 text-xs text-status-rejected">
          {error}
        </p>
      )}
    </div>
  );
}

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  error?: string;
}

export function TextInput({ error, className = "", ...props }: TextInputProps) {
  return (
    <input
      {...props}
      aria-invalid={!!error}
      aria-describedby={error ? `${props.id}-error` : undefined}
      className={`${baseInput} ${borderFor(error)} ${className}`}
    />
  );
}

function showPicker(e: { currentTarget: HTMLInputElement }) {
  try {
    e.currentTarget.showPicker?.();
  } catch {
    /* some browsers refuse outside a user gesture; ignore */
  }
}

export function DateInput({ error, className = "", ...props }: TextInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        type="date"
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        onClick={showPicker}
        className={`picker-input ${baseInput} ${borderFor(error)} pr-10 ${
          props.value ? "" : "text-muted"
        } ${className}`}
      />
      <Image
        src="/images/date.png"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
      />
    </div>
  );
}

export function TimeInput({ error, className = "", ...props }: TextInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        type="time"
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        onClick={showPicker}
        className={`picker-input ${baseInput} ${borderFor(error)} pr-10 ${
          props.value ? "" : "text-muted"
        } ${className}`}
      />
      <Image
        src="/images/time.png"
        alt=""
        width={16}
        height={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
      />
    </div>
  );
}

export function SelectInput({
  id,
  value,
  onChange,
  error,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${baseInput} ${borderFor(error)} appearance-none pr-10 ${value ? "" : "text-muted"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {PAYMENT_METHODS.map((m) => (
          <option key={m} value={m} className="text-primary">
            {m}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function FileUpload({
  id,
  value,
  onChange,
  error,
}: {
  id: string;
  value: SlipValue | null;
  onChange: (value: SlipValue | null) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange({ name: file.name, url, size: file.size });
    e.target.value = ""; // allow re-selecting the same file
  };

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept="image/*,application/pdf"
        onChange={handleChange}
        className="sr-only"
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-invalid={!!error}
        className={`flex h-10 w-full overflow-hidden rounded-md border bg-field text-left text-sm ${borderFor(error)} focus-visible:outline-2 focus-visible:outline-primary`}
      >
        <span className="flex w-12 shrink-0 items-center justify-center bg-secondary text-white">
          <UploadIcon className="h-5 w-5" />
        </span>
        <span className={`flex-1 truncate px-3 leading-10 ${value ? "" : "text-muted"}`}>
          {value ? value.name : "Please upload your payment slip"}
        </span>
      </button>
    </div>
  );
}
