import Link from "next/link";

import { SubBanner } from "@/components/ui/sub-banner";
import type { SubBannerItem } from "../types";

/** sub_banner — node 148:2456 (SUB_BANNER_ver1 카드 2개, 24px 간격) */
export function SubBannerSection({ items }: { items: SubBannerItem[] }) {
  return (
    <section
      aria-label="기획 배너"
      className="mx-auto w-full max-w-[1440px] px-6 lg:px-gutter"
    >
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href} className="block hover:opacity-90">
              <SubBanner
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                title={item.title}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
