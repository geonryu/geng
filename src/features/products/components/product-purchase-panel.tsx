"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ChevronToggleIcon,
  CloseIcon,
  LikeIcon,
} from "@/components/ui/icons";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SelectField } from "@/components/ui/select-field";
import type { ProductOption } from "@/features/products/detail-types";
import { cn } from "@/lib/utils/cn";
import { formatWon } from "@/lib/utils/price";

type Selection = { option: ProductOption; quantity: number };

/**
 * 구매 패널 — node 277:8632 (540px, PC) · node 290:14758 / 290:14759 (MO 바텀시트)
 *
 * 옵션을 고르면 선택 목록(node 277:8655)이 붙고, 구매수량·총액 행이 갱신된다.
 *
 * PC 는 이 내용이 본문 오른쪽 열에 그대로 펼쳐져 있고, MO 는 화면 하단 시트에 들어간다.
 * MO 기본값은 **접힘**(node 290:15169 — 핸들 + 버튼 3개만 보인다)이고, 핸들을 누르면
 * 옵션 선택·수량·총액이 올라온다. 두 레이아웃이 같은 상태를 보도록 옵션 영역을
 * OptionPicker / TotalRow / ActionRow 로 쪼개 양쪽에서 함께 쓴다.
 */
export function ProductPurchasePanel({
  name,
  price,
  shippingNotice,
  options,
}: {
  name: string;
  /** 판매가 (원 단위 정수) */
  price: number;
  shippingNotice: string;
  options: ProductOption[];
}) {
  const [selected, setSelected] = useState<Selection[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const add = (id: string) => {
    const option = options.find((item) => item.id === id);
    if (!option || selected.some((item) => item.option.id === id)) return;
    setSelected((items) => [...items, { option, quantity: 1 }]);
  };

  const setQuantity = (id: string, delta: number) =>
    setSelected((items) =>
      items.map((item) =>
        item.option.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );

  const remove = (id: string) =>
    setSelected((items) => items.filter((item) => item.option.id !== id));

  const totalCount = selected.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selected.reduce(
    (sum, item) => sum + item.option.price * item.quantity,
    0,
  );

  const picker = (
    <OptionPicker
      options={options}
      selected={selected}
      onAdd={add}
      onQuantityChange={setQuantity}
      onRemove={remove}
    />
  );
  const totals = <TotalRow count={totalCount} amount={totalPrice} />;

  return (
    <div className="flex flex-col gap-5 lg:w-[540px]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-5">
          <h1 className="text-[20px] font-medium text-ink">{name}</h1>
          <Price amount={price} size="lg" />
        </div>

        <p className="flex items-center gap-1 text-[14px] text-muted">
          <Image
            src="/assets/icons/delivery-truck.svg"
            alt=""
            width={20}
            height={20}
            unoptimized
          />
          {shippingNotice}
        </p>
      </div>

      <hr className="border-line" />

      {/* PC — 옵션부터 구매 버튼까지 본문에 그대로 펼친다 */}
      <div className="hidden flex-col gap-6 lg:flex">
        {picker}
        {totals}
        <ActionRow />
      </div>

      {/* MO 하단 시트 — node 290:14758(접힘) · 290:14759(펼침) */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white lg:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
          aria-controls="purchase-sheet"
          aria-label={sheetOpen ? "구매 옵션 접기" : "구매 옵션 펼치기"}
          className="flex h-6 w-full items-center justify-center text-muted"
        >
          <ChevronToggleIcon direction={sheetOpen ? "down" : "up"} />
        </button>

        <div
          id="purchase-sheet"
          hidden={!sheetOpen}
          className="flex max-h-[55vh] flex-col gap-5 overflow-y-auto px-5 pb-2"
        >
          {picker}
          {totals}
        </div>

        <div className="px-5 pb-3">
          <ActionRow />
        </div>
      </div>
    </div>
  );
}

/** 옵션 선택 + 선택 목록 — node 277:8637 / 277:8655 */
function OptionPicker({
  options,
  selected,
  onAdd,
  onQuantityChange,
  onRemove,
}: {
  options: ProductOption[];
  selected: Selection[];
  onAdd: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        {/* 라벨은 PC 시안에만 있다 (node 277:8637) */}
        <p className="hidden text-[14px] font-medium text-ink lg:block">
          OPTION
        </p>
        <SelectField
          aria-label="옵션 선택"
          value=""
          onChange={(event) => onAdd(event.target.value)}
        >
          <option value="">- [필수] 옵션을 선택해주세요 -</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>

      {selected.map(({ option, quantity }) => (
        <div
          key={option.id}
          className="flex flex-col gap-2 rounded-field bg-surface-soft px-5 py-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-ink">{option.label}</span>
            <button
              type="button"
              aria-label={`${option.label} 선택 해제`}
              onClick={() => onRemove(option.id)}
              className="text-ink"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <QuantityStepper
              value={quantity}
              onDecrease={() => onQuantityChange(option.id, -1)}
              onIncrease={() => onQuantityChange(option.id, 1)}
            />
            <Price amount={option.price * quantity} size="md" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** 구매수량 / 총액 — node 277:8677 */
function TotalRow({ count, amount }: { count: number; amount: number }) {
  return (
    <div className="flex items-center justify-between whitespace-nowrap text-ink">
      <p className="flex items-center gap-[2px] text-[14px]">
        구매수량
        <span className="font-bold">{count}</span>개
      </p>
      <p className="flex items-center gap-[2px] text-[16px] font-bold">
        총<span>{formatWon(amount)}</span>원
      </p>
    </div>
  );
}

/** 찜 · 장바구니 · 구매하기 — node 277:8690 / 290:15140 */
function ActionRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-[45px] items-center gap-2 lg:gap-4", className)}>
      <button
        type="button"
        aria-label="찜하기"
        className="flex size-[45px] shrink-0 items-center justify-center rounded-field border border-ink bg-white text-ink"
      >
        <LikeIcon />
      </button>
      <Button tone="outline-strong" size="md" className="flex-1">
        장바구니
      </Button>
      <Button tone="solid" size="md" className="flex-1">
        구매하기
      </Button>
    </div>
  );
}
