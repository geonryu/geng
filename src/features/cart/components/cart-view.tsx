"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button, buttonClass } from "@/components/ui/button";
import { NoticeBox } from "@/components/ui/notice-box";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { SummaryBar } from "@/components/ui/summary-bar";
import { CartEmpty } from "@/features/cart/components/cart-empty";
import { CartTable } from "@/features/cart/components/cart-table";
import type { CartLine } from "@/features/cart/types";
import { formatWon } from "@/lib/utils/price";

/**
 * 장바구니 — node 277:7622(상품있음) · 277:6305(상품없음)
 * 국내/해외 배송 탭, 무료배송 안내, 목록, 합계 바, 주문 버튼, 이용안내 순으로 쌓인다.
 */
const FREE_SHIPPING_THRESHOLD = 70000;
const SHIPPING_FEE = 3000;

const NOTICE = [
  "장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.",
  "해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.",
  "해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.",
];

export function CartView({ initialLines }: { initialLines: CartLine[] }) {
  const [tab, setTab] = useState("domestic");
  const [lines, setLines] = useState(initialLines);
  const [selectedIds, setSelectedIds] = useState(
    initialLines.map((line) => line.id),
  );

  const domesticLines = tab === "domestic" ? lines : [];

  const toggle = (id: string) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );

  const toggleAll = () =>
    setSelectedIds((ids) =>
      ids.length === lines.length ? [] : lines.map((line) => line.id),
    );

  const changeQuantity = (id: string, delta: number) =>
    setLines((items) =>
      items.map((line) =>
        line.id === id
          ? { ...line, quantity: Math.max(1, line.quantity + delta) }
          : line,
      ),
    );

  const remove = (id: string) => {
    setLines((items) => items.filter((line) => line.id !== id));
    setSelectedIds((ids) => ids.filter((value) => value !== id));
  };

  const removeSelected = () => {
    setLines((items) => items.filter((line) => !selectedIds.includes(line.id)));
    setSelectedIds([]);
  };

  const selectedLines = domesticLines.filter((line) =>
    selectedIds.includes(line.id),
  );
  const itemTotal = selectedLines.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0,
  );
  const shipping = itemTotal > 0 && itemTotal < FREE_SHIPPING_THRESHOLD ? SHIPPING_FEE : 0;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - itemTotal);

  return (
    <div className="flex flex-col gap-[50px]">
      <div className="flex flex-col gap-6">
        <SegmentedToggle
          items={[
            { id: "domestic", label: "국내배송", suffix: `(${lines.length})` },
            { id: "overseas", label: "해외배송", suffix: "(0)" },
          ]}
          activeId={tab}
          onSelect={setTab}
        />

        {domesticLines.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-col gap-3 border-t border-line pt-3">
            {/* 무료배송 안내 — node 277:7633 */}
            <div className="flex items-center gap-3">
              <span className="flex size-[45px] shrink-0 items-center justify-center rounded-full bg-surface-soft">
                <Image
                  src="/assets/icons/free-shipping.svg"
                  alt=""
                  width={28}
                  height={13}
                  unoptimized
                />
              </span>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                <p className="text-[14px] text-ink">
                  {remaining > 0 ? (
                    <>
                      <span className="font-bold">{formatWon(remaining)}원</span>{" "}
                      더 담으면 <span className="font-bold">무료배송</span>{" "}
                      이에요!
                    </>
                  ) : (
                    <span className="font-bold">무료배송 대상이에요!</span>
                  )}
                </p>
                <Button size="sm" tone="outline">
                  상품 추가하기
                </Button>
              </div>
            </div>

            <CartTable
              lines={domesticLines}
              selectedIds={selectedIds}
              onToggle={toggle}
              onToggleAll={toggleAll}
              onQuantityChange={changeQuantity}
              onRemove={remove}
            />

            {/* 선택 상품 동작 — node 277:7713 */}
            <div className="flex flex-wrap items-start gap-3 border-t border-line pt-3">
              <div className="flex flex-1 flex-wrap items-center gap-[10px]">
                <Button size="sm" tone="muted" onClick={removeSelected}>
                  선택 상품 삭제
                </Button>
                <Button size="sm" tone="outline">
                  선택 상품 해외배송 장바구니로 이동
                </Button>
              </div>
              <Button size="sm" tone="outline">
                견적서 출력
              </Button>
            </div>

            <div className="mt-6">
              <SummaryBar
                cells={[
                  { label: "상품 총 금액", amount: formatWon(itemTotal) },
                  { label: "배송비", amount: formatWon(shipping) },
                  {
                    label: "결제 예정 금액",
                    amount: formatWon(itemTotal + shipping),
                    emphasis: true,
                  },
                ]}
              />
            </div>

            {/* 주문 버튼 — node 277:7760 */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Link
                href="/"
                className={buttonClass({
                  tone: "outline",
                  size: "md",
                  className: "sm:w-[267px]",
                })}
              >
                계속 쇼핑하기
              </Link>
              <Button size="md" tone="outline-strong" className="sm:w-[267px]">
                선택상품 주문하기
              </Button>
              <Button size="md" tone="solid" className="sm:w-[267px]">
                전체상품 주문하기
              </Button>
            </div>
          </div>
        )}
      </div>

      <NoticeBox title="장바구니 이용안내" items={NOTICE} />
    </div>
  );
}
