"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CloseIcon, LikeIcon } from "@/components/ui/icons";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SelectField } from "@/components/ui/select-field";
import type { ProductOption } from "@/features/products/detail-types";
import { formatWon } from "@/lib/utils/price";

/**
 * 구매 패널 — node 277:8632 (540px)
 * 옵션을 고르면 선택 목록(node 277:8655)이 붙고, 구매수량·총액 행이 갱신된다.
 * MO는 구매 버튼이 화면 하단에 고정되므로(node 290:15140) 여기서는 감춘다.
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
  const [selected, setSelected] = useState<
    { option: ProductOption; quantity: number }[]
  >([]);

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

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium text-ink">OPTION</p>
            <SelectField
              aria-label="옵션 선택"
              value=""
              onChange={(event) => add(event.target.value)}
            >
              <option value="">- [필수] 옵션을 선택해주세요 -</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </div>

          {/* 선택한 옵션 목록 — node 277:8655 */}
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
                  onClick={() => remove(option.id)}
                  className="text-ink"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <QuantityStepper
                  value={quantity}
                  onDecrease={() => setQuantity(option.id, -1)}
                  onIncrease={() => setQuantity(option.id, 1)}
                />
                <Price amount={option.price * quantity} size="md" />
              </div>
            </div>
          ))}
        </div>

        {/* 구매수량 / 총액 — node 277:8677 */}
        <div className="flex items-center justify-between whitespace-nowrap text-ink">
          <p className="flex items-center gap-[2px] text-[14px]">
            구매수량
            <span className="font-bold">{totalCount}</span>개
          </p>
          <p className="flex items-center gap-[2px] text-[16px] font-bold">
            총<span>{formatWon(totalPrice)}</span>원
          </p>
        </div>

        {/* 구매 동작 — PC 전용. MO는 하단 고정 바가 대신한다. */}
        <div className="hidden h-[45px] items-center gap-4 lg:flex">
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
      </div>

      {/* MO 하단 고정 바 — node 290:15140 */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center gap-2 border-t border-line bg-white px-5 py-3 lg:hidden">
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
    </div>
  );
}
