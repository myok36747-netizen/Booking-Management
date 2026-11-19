import type { BookingStatus } from "@/types/booking";
import { STATUS_LABEL, STATUS_TEXT_CLASS } from "@/lib/constants";

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`text-sm font-semibold uppercase tracking-wide ${STATUS_TEXT_CLASS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
