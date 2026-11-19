import Image from "next/image";
import Link from "next/link";

export function PageHeader({ title, backHref = "/" }: { title: string; backHref?: string }) {
  return (
    <header className="mb-6 flex items-center gap-3">
      <Link href={backHref} aria-label="Back to booking list" className="shrink-0">
        <Image src="/images/back.png" alt="" width={24} height={24} />
      </Link>
      <h1 className="text-xl font-medium sm:text-2xl">{title}</h1>
    </header>
  );
}
