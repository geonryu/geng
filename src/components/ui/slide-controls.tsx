"use client";

import { cn } from "@/lib/utils/cn";
import { ChevronIcon } from "./icons";

/**
 * BUTTON_slide(L/R) — node 148:2057 / 148:2074
 * large 45px · small 24px · mini 16px(Variant5, 최종화면 메인 배너 진행 컨트롤 node 181:560)
 */
export function SlideButton({
  direction,
  size = "large",
  active = false,
  disabled,
  onClick,
  className,
}: {
  direction: "left" | "right";
  size?: "large" | "small" | "mini";
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const isLarge = size === "large";
  const isMini = size === "mini";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "이전" : "다음"}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-white transition-colors",
        isMini ? "border" : "border-2",
        isLarge ? "size-[45px]" : isMini ? "size-4" : "size-6",
        active
          ? "border-ink text-ink"
          : "border-control text-control hover:border-ink hover:text-ink",
        className,
      )}
    >
      <ChevronIcon
        direction={direction}
        className={
          isLarge
            ? "h-[17px] w-[10px]"
            : isMini
              ? "h-[6px] w-[4px]"
              : "h-[9px] w-[6px]"
        }
      />
    </button>
  );
}

/** 슬라이드 인디케이터 — node 148:2247 / 148:2372 */
export function SlideDots({
  count,
  activeIndex = 0,
  onSelect,
  className,
}: {
  count: number;
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`${index + 1}번째 슬라이드`}
          aria-current={index === activeIndex}
          onClick={() => onSelect?.(index)}
          className={cn(
            "size-[7px] rounded-full transition-colors",
            index === activeIndex ? "bg-ink" : "bg-control",
          )}
        />
      ))}
    </div>
  );
}
