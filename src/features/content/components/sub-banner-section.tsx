"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import { ProductListRow } from "@/components/ui/product-list-row";
import type { SubBannerItem } from "@/features/content/types";

/**
 * 서브 배너 — node 277:5198 (Frame 96)
 * 카드 하나는 상단 이미지(336px, 문구는 이미지에 포함) + 하단 상품 목록 패널로 이뤄진다.
 * PC는 두 장을 나란히, MO는 가로 스크롤로 넘긴다 (node 290:13177).
 */
export function SubBannerSection({ items }: { items: SubBannerItem[] }) {
  const [liked, setLiked] = useState<string[]>([]);

  const toggle = (id: string) =>
    setLiked((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );

  return (
    <Container className="px-0 lg:px-0">
      <ul className="flex gap-4 overflow-x-auto px-5 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex w-[320px] shrink-0 flex-col sm:w-[440px] lg:w-auto"
          >
            <Link
              href={item.href}
              className="relative aspect-[562/336] w-full overflow-hidden rounded-t-card"
            >
              <Image
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 1024px) 80vw, 562px"
                className="object-cover"
              />
            </Link>

            <div className="flex flex-1 flex-col gap-1 rounded-b-card border border-line bg-white px-3 pt-3 pb-4">
              {item.products.map((product) => (
                <ProductListRow
                  key={product.id}
                  item={product}
                  liked={liked.includes(product.id)}
                  onToggleLike={() => toggle(product.id)}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
