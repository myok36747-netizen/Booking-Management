import type { SVGProps } from "react";

/** Edit icon for ACCEPTED bookings (document + pencil), drawn to match edit.png */
export function EditDocIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10.5 3.2C7 2.9 4.4 3.1 4.2 5.2c-.2 3.7-.2 8.6 0 12.4.1 1.5 1.2 2.1 2.7 2.2 2.2.2 4.2.2 6.2 0" />
      <path d="M13.4 3.2c2.3.1 4.6.3 5.4 1.6.4.8.4 2.3.4 3.7" />
      <path d="M7.6 8.4h2.2M7.6 12h2.2M7.6 15.6h2.2" />
      <path d="M17.8 11.4l2.6 2.6-5.1 5.1-3.4.8.8-3.4 5.1-5.1z" />
    </svg>
  );
}

export function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7 18a4.5 4.5 0 01-.6-8.96A6 6 0 0117.7 7.9 4.8 4.8 0 0117 18" />
      <path d="M12 20v-8M9 14.5l3-3 3 3" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.5 7.5h9L10 13z" />
    </svg>
  );
}
