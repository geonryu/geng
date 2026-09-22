"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CloseIcon } from "@/components/ui/icons";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { cn } from "@/lib/utils/cn";
import type { CartLine } from "@/features/cart/types";

/**
 * 장바구니 목록 — node 277:7647
 * PC는 상품명/판매가격/수량/주문금액 4열 표, MO는 시안이 없어 같은 정보를 카드로 눕혔다.
 * 열 폭은 시안(396 / 148.5 × 4)의 비율을 유지한다.
 */
const COLUMNS = "grid-cols-[minmax(0,396fr)_repeat(4,minmax(0,148fr))]";

export function CartTable({
  lines,
  selectedIds,
  onToggle,
  onToggleAll,
  onQuantityChange,
  onRemove,
}: {
  lines: CartLine[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  const allSelected =
    lines.length > 0 && lines.every((line) => selectedIds.includes(line.id));

  return (
    <div className="flex flex-col gap-6">
      {/* 헤더 — PC 전용 (node 277:7648) */}
      <div className="hidden items-center gap-24 border-y border-line lg:flex">
        <Checkbox
          shape="square"
          checked={allSelected}
          onChange={onToggleAll}
          aria-label="전체 선택"
        />
        <div className={cn("grid flex-1", COLUMNS)}>
          <span className="flex h-11 items-center text-[15px] font-bold text-ink">
            상품명/옵션
          </span>
          {["판매가격", "수량", "주문금액"].map((label) => (
            <span
              key={label}
              className="flex h-11 items-center justify-center text-[15px] font-bold text-ink"
            >
              {label}
            </span>
          ))}
          <span />
        </div>
      </div>

      <ul className="flex flex-col gap-6 border-b border-line pb-6 lg:border-b-0 lg:pb-0">
        {lines.map((line) => (
          <li
            key={line.id}
            className="flex items-start gap-[10px] border-b border-line pb-6 last:border-b-0 last:pb-0 lg:items-center lg:border-b-0 lg:pb-0"
          >
            <Checkbox
              shape="square"
              checked={selectedIds.includes(line.id)}
              onChange={() => onToggle(line.id)}
              aria-label={`${line.name} 선택`}
              className="mt-1 lg:mt-0"
            />

            <div className="relative size-[76px] shrink-0">
              <Image
                src={line.imageSrc}
                alt=""
                fill
                sizes="76px"
                className="object-cover"
              />
            </div>

            {/* MO — 세로 카드 */}
            <div className="flex min-w-0 flex-1 flex-col gap-3 lg:hidden">
              <div className="flex items-start justify-between gap-2">
                <div className="flex min-w-0 flex-col gap-3">
                  <p className="text-[14px] font-bold text-ink">{line.name}</p>
                  <p className="text-[14px] text-muted">옵션 : {line.option}</p>
                </div>
                <button
                  type="button"
                  aria-label={`${line.name} 삭제`}
                  onClick={() => onRemove(line.id)}
                  className="shrink-0 text-ink"
                >
                  <CloseIcon />
                </button>
              </div>

              <PriceCell line={line} align="start" />

              <div className="flex items-center justify-between gap-2">
                <QuantityStepper
                  value={line.quantity}
                  onDecrease={() => onQuantityChange(line.id, -1)}
                  onIncrease={() => onQuantityChange(line.id, 1)}
                />
                <p className="flex items-center whitespace-nowrap text-[14px] text-ink">
                  <span className="font-bold">
                    {formatWon(toNumber(line.price) * line.quantity)}
                  </span>
                  원
                </p>
              </div>

              <div className="flex gap-2">
                <Button size="sm" tone="solid" className="flex-1">
                  주문하기
                </Button>
                <Button size="sm" tone="outline" className="flex-1">
                  찜하기
                </Button>
              </div>
            </div>

            {/* PC — 표 행 */}
            <div className={cn("hidden flex-1 lg:grid", COLUMNS)}>
              <div className="flex h-[76px] flex-col justify-center gap-3 pr-4">
                <p className="text-[14px] font-bold text-ink">{line.name}</p>
                <p className="text-[14px] text-muted">옵션 : {line.option}</p>
              </div>

              <div className="flex h-[76px] items-center justify-center">
                <PriceCell line={line} align="center" />
              </div>

              <div className="flex h-[76px] items-center justify-center gap-2">
                <QuantityStepper
                  value={line.quantity}
                  onDecrease={() => onQuantityChange(line.id, -1)}
                  onIncrease={() => onQuantityChange(line.id, 1)}
                />
                <Button
                  size="sm"
                  tone="outline"
                  onClick={() => onRemove(line.id)}
                >
                  삭제
                </Button>
              </div>

              <div className="flex h-[76px] items-center justify-center">
                <p className="flex items-center whitespace-nowrap text-[14px] text-ink">
                  <span className="font-bold">
                    {formatWon(toNumber(line.price) * line.quantity)}
                  </span>
                  원
                </p>
              </div>

              <div className="flex h-[76px] flex-col items-center justify-center gap-2">
                <Button size="sm" tone="solid" className="w-[70px]">
                  주문하기
                </Button>
                <Button size="sm" tone="outline" className="w-[70px]">
                  찜하기
                </Button>
              </div>
            </div>

            <button
              type="button"
              aria-label={`${line.name} 삭제`}
              onClick={() => onRemove(line.id)}
              className="hidden shrink-0 text-ink lg:block"
            >
              <CloseIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 판매가격 — 정가 취소선 + 할인가 (node 277:7670) */
function PriceCell({
  line,
  align,
}: {
  line: CartLine;
  align: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center" : "items-start",
      )}
    >
      {line.originalPrice && (
        <p className="text-[14px] text-muted line-through">
          {line.originalPrice}
        </p>
      )}
      <p className="flex items-center whitespace-nowrap text-[14px] text-ink">
        <span className="font-bold">{line.price.replace(/원$/, "")}</span>원
      </p>
    </div>
  );
}

export function toNumber(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

export function formatWon(value: number) {
  return value.toLocaleString("ko-KR");
}
