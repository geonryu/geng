"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductCard } from "@/components/ui/product-card";
import { SlideButton, SlideDots } from "@/components/ui/slide-controls";
import { SegmentedTabs } from "@/components/ui/tabs";
import type { ShowcaseTab } from "../types";

/**
 * Most Popular — node 148:2310 / Product — node 148:2347
 * 두 섹션은 타이틀·탭 개수만 다른 같은 구조라 하나의 컴포넌트로 통합했다.
 * 시안은 1340px 안에 244px 카드 4장(간격 55px)을 두고 좌우 99px을 슬라이드 버튼에 내준다.
 */
const PAGE_SIZE = 4;

export function ProductShowcase({
  title,
  tabs,
}: {
  title: string;
  tabs: ShowcaseTab[];
}) {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [page, setPage] = useState(0);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const pageCount = Math.max(
    1,
    Math.ceil(activeTab.products.length / PAGE_SIZE),
  );
  const safePage = Math.min(page, pageCount - 1);
  const visible = activeTab.products.slice(
    safePage * PAGE_SIZE,
    safePage * PAGE_SIZE + PAGE_SIZE,
  );

  function selectTab(id: string) {
    setActiveId(id);
    setPage(0);
  }

  return (
    <section
      aria-label={title}
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 lg:px-gutter"
    >
      <div className="flex items-center py-2">
        <h2 className="text-[24px] font-bold text-ink lg:text-[30px]">
          {title}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-9">
        <SegmentedTabs items={tabs} activeId={activeId} onSelect={selectTab} />

        <div className="relative w-full">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-[55px] lg:px-[99px]">
            {visible.map((product) => (
              <li key={product.id}>
                <Link href={product.href} className="block hover:opacity-90">
                  <ProductCard
                    imageSrc={product.imageSrc}
                    imageAlt={product.imageAlt}
                    title={product.title}
                    price={product.price}
                    titleLines={product.titleLines}
                    sale={product.sale}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* 좌우 버튼은 카드 4열이 한 줄로 서는 lg 이상에서만 쓴다. */}
          <div className="hidden lg:block">
            <SlideButton
              direction="left"
              active={safePage > 0}
              disabled={safePage === 0}
              onClick={() => setPage(safePage - 1)}
              className="absolute top-1/2 left-0 -translate-y-1/2"
            />
            <SlideButton
              direction="right"
              active={safePage < pageCount - 1}
              disabled={safePage >= pageCount - 1}
              onClick={() => setPage(safePage + 1)}
              className="absolute top-1/2 right-0 -translate-y-1/2"
            />
          </div>
        </div>

        <SlideDots
          count={pageCount}
          activeIndex={safePage}
          onSelect={setPage}
        />
      </div>
    </section>
  );
}
