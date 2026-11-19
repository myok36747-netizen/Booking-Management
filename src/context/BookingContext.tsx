"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Booking, BookingInput } from "@/types/booking";
import { SEED_BOOKINGS } from "./seed";

interface BookingContextValue {
  bookings: Booking[];
  getBooking: (id: string) => Booking | undefined;
  addBooking: (input: BookingInput) => Booking;
  updateBooking: (id: string, changes: Partial<BookingInput>) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Holds all bookings in React state (frontend only, no backend/storage).
 * The provider sits in the root layout, so data survives client-side
 * navigation between pages. A full browser refresh resets it to the seed data.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(SEED_BOOKINGS);

  const getBooking = useCallback(
    (id: string) => bookings.find((b) => b.id === id),
    [bookings],
  );

  const addBooking = useCallback((input: BookingInput) => {
    const booking: Booking = {
      ...input,
      id: `bk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      status: "pending",
    };
    setBookings((prev) => [booking, ...prev]); // newest first
    return booking;
  }, []);

  const updateBooking = useCallback((id: string, changes: Partial<BookingInput>) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              ...changes,
              // A rejected booking that gets corrected goes back to review.
              status: b.status === "rejected" ? "pending" : b.status,
            }
          : b,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({ bookings, getBooking, addBooking, updateBooking }),
    [bookings, getBooking, addBooking, updateBooking],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used inside <BookingProvider>");
  return ctx;
}
