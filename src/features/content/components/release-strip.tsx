import Link from "next/link";

import { ReleaseCard } from "@/components/ui/release-card";
import type { ReleaseItem } from "../types";

/** Release — node 148:1802 (RELEASE_ver1 카드 4개, 12px 간격) */
export function ReleaseStrip({ items }: { items: ReleaseItem[] }) {
  return (
    <section
      aria-label="새 소식"
      className="mx-auto w-full max-w-[1440px] px-6 lg:px-gutter"
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="block hover:opacity-90">
              <ReleaseCard
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                label={item.label}
                title={item.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
