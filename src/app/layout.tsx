import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/chakra-petch/400.css";
import "@fontsource/chakra-petch/500.css";
import "@fontsource/chakra-petch/600.css";
import "@fontsource/noto-sans-myanmar/400.css";
import "@fontsource/noto-sans-myanmar/500.css";
import "@fontsource/noto-sans-myanmar/600.css";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";

export const metadata: Metadata = {
  title: "Level Placement Test Booking",
  description: "Book and manage Level Placement Test sessions",
  icons: { icon: "/images/icon.png" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <BookingProvider>
          <main className="mx-auto w-full max-w-[1240px] px-4 py-8 sm:px-8 sm:py-10">
            {children}
          </main>
        </BookingProvider>
      </body>
    </html>
  );
}
