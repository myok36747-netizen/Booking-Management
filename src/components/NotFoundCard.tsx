import Link from "next/link";

export function NotFoundCard({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-line bg-white p-8 text-center">
      <p className="mb-4 text-sm">{message}</p>
      <Link href="/" className="text-sm font-medium text-status-accepted underline">
        Back to Booking List
      </Link>
    </div>
  );
}
