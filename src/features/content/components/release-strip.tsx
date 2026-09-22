import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { ReleaseItem } from "@/features/content/types";

/**
 * Release — node 277:5118
 * PC: 273×53 카드 4장이 16px 간격으로 1140을 채운다.
 * MO: 같은 카드를 가로 스크롤로 넘긴다 (node 290:13095). 시안의 카드 폭 비율을 유지하려고
 *     기본 260px 고정폭에 마지막 카드 뒤 여백만 남겼다.
 */
export function ReleaseStrip({ items }: { items: ReleaseItem[] }) {
  return (
    <Container className="px-0 lg:px-0">
      <ul className="flex gap-4 overflow-x-auto px-5 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
        {items.map((item) => (
          <li key={item.id} className="w-[260px] shrink-0 lg:w-auto">
            <Link
              href={item.href}
              className="flex h-[53px] items-center gap-2 rounded-card border border-line bg-white px-3 hover:border-ink"
            >
              <span className="relative size-9 shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <span className="flex min-w-0 flex-col gap-[2px] text-[14px] text-ink">
                <span className="truncate">{item.label}</span>
                <span className="truncate font-bold">{item.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
