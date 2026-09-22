"use client";

import { useState } from "react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/ui/product-card";
import { ProductListRow } from "@/components/ui/product-list-row";
import { SlideButton, SlideDots } from "@/components/ui/slide-controls";
import { PillTabs, SegmentedTabs } from "@/components/ui/tabs";
import type { ShowcaseProduct, ShowcaseTab } from "@/features/products/types";
import { cn } from "@/lib/utils/cn";

/**
 * 상품 진열 섹션 — node 277:5147 (Most Popular) · 277:5235 (Product)
 *
 * 두 섹션은 제목 + 36px 분할 탭 + 상품 진열이라는 뼈대를 공유하고, 진열 방식만 다르다.
 *   carousel — PC는 5칸 한 페이지 + 하단 슬라이드 컨트롤, MO는 카드 가로 스크롤
 *   list     — PC는 5칸 × 2줄 그리드, MO는 5행짜리 목록을 열 단위로 가로 스크롤 (node 290:13242)
 */

/** 시안의 한 줄 = 5칸 */
const COLUMNS = 5;

export function ProductShowcase({
  title,
  tabs,
  variant = "list",
}: {
  title: string;
  tabs: ShowcaseTab[];
  variant?: "carousel" | "list";
}) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const [page, setPage] = useState(0);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  if (!activeTab) return null;

  const products = activeTab.products;
  const pageCount = Math.max(1, Math.ceil(products.length / COLUMNS));
  const safePage = Math.min(page, pageCount - 1);

  const selectTab = (id: string) => {
    setActiveId(id);
    setPage(0);
  };

  return (
    <section className="flex flex-col gap-4">
      <Container className="px-5 lg:px-0">
        <h2 className="py-2 text-[24px] font-bold text-ink">{title}</h2>
      </Container>

      {/* MO는 pill 탭을 가로 스크롤(node 290:13126), PC는 36px 분할 탭을 쓴다. */}
      <div className="flex gap-[6px] overflow-x-auto px-5 lg:hidden">
        <PillTabs
          items={tabs}
          activeId={activeTab.id}
          onSelect={selectTab}
          variant="outline"
        />
      </div>
      <Container className="hidden lg:block lg:px-0">
        <SegmentedTabs
          items={tabs}
          activeId={activeTab.id}
          onSelect={selectTab}
          size="sm"
        />
      </Container>

      <div className="mt-1">
        {variant === "carousel" ? (
          <CarouselBody
            products={products}
            page={safePage}
            pageCount={pageCount}
            onPage={setPage}
          />
        ) : (
          <ListBody products={products} />
        )}
      </div>
    </section>
  );
}

/** Most Popular — node 277:5150 */
function CarouselBody({
  products,
  page,
  pageCount,
  onPage,
}: {
  products: ShowcaseProduct[];
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
}) {
  const pageProducts = products.slice(page * COLUMNS, page * COLUMNS + COLUMNS);

  return (
    <div className="flex flex-col gap-5">
      {/* MO — 카드 가로 스크롤 */}
      <ul className="flex gap-4 overflow-x-auto px-5 lg:hidden">
        {products.map((product) => (
          <li key={product.id} className="w-[138px] shrink-0">
            <ShowcaseCard product={product} />
          </li>
        ))}
      </ul>

      {/* PC — 한 페이지 5칸 */}
      <Container className="hidden lg:block">
        <ul className="grid grid-cols-5 gap-4">
          {pageProducts.map((product) => (
            <li key={product.id}>
              <ShowcaseCard product={product} />
            </li>
          ))}
        </ul>
      </Container>

      {pageCount > 1 && (
        <div className="hidden items-center justify-center gap-4 lg:flex">
          <SlideButton
            direction="left"
            size="small"
            active={page > 0}
            onClick={() => onPage(Math.max(0, page - 1))}
          />
          <SlideDots count={pageCount} activeIndex={page} onSelect={onPage} />
          <SlideButton
            direction="right"
            size="small"
            active={page < pageCount - 1}
            onClick={() => onPage(Math.min(pageCount - 1, page + 1))}
          />
        </div>
      )}
    </div>
  );
}

/** Product — node 277:5238 */
function ListBody({ products }: { products: ShowcaseProduct[] }) {
  const [liked, setLiked] = useState<string[]>([]);
  const toggle = (id: string) =>
    setLiked((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );

  /** MO는 5행씩 끊어 열 단위로 가로 스크롤한다. */
  const columns: ShowcaseProduct[][] = [];
  for (let i = 0; i < products.length; i += COLUMNS) {
    columns.push(products.slice(i, i + COLUMNS));
  }

  return (
    <>
      {/* MO — 목록 열 가로 스크롤 */}
      <div className="flex gap-6 overflow-x-auto px-5 lg:hidden">
        {columns.map((column, columnIndex) => (
          <ul
            key={columnIndex}
            className="flex w-[296px] shrink-0 flex-col gap-[3px]"
          >
            {column.map((product) => (
              <li key={product.id}>
                <ProductListRow
                  item={{
                    id: product.id,
                    imageSrc: product.imageSrc,
                    title: product.title,
                    price: product.price,
                    saleRate: product.sale?.rate,
                  }}
                  liked={liked.includes(product.id)}
                  onToggleLike={() => toggle(product.id)}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* PC — 5칸 그리드 */}
      <Container className="hidden lg:block">
        <ul className="grid grid-cols-5 gap-x-4 gap-y-5">
          {products.map((product) => (
            <li key={product.id}>
              <ShowcaseCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

function ShowcaseCard({
  product,
  className,
}: {
  product: ShowcaseProduct;
  className?: string;
}) {
  return (
    <ProductCard
      className={cn(className)}
      imageSrc={product.imageSrc}
      imageAlt={product.imageAlt}
      title={product.title}
      price={product.price}
      titleLines={product.titleLines}
      sale={product.sale}
    />
  );
}
