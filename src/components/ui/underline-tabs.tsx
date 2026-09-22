"use client";

import { cn } from "@/lib/utils/cn";

/**
 * 밑줄 탭 — node 277:8600 / 277:5417~5420 (상품설명 · 상품후기 · Q&A)
 * 45px 높이로 칸을 균등 분할하고, 활성 항목의 라벨 폭만큼만 밑줄을 긋는다.
 * 탭 줄 전체 아래에는 별도의 line 구분선(node 277:8593)이 깔린다.
 */
export type UnderlineTabItem = {
  id: string;
  label: string;
};

export function UnderlineTabs({
  items,
  activeId,
  onSelect,
  className,
}: {
  items: UnderlineTabItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn("flex w-full items-stretch border-b border-line", className)}
    >
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
            className="flex h-[45px] flex-1 items-center justify-center"
          >
            <span
              className={cn(
                "border-b-2 pb-[10px] text-[16px]",
                active
                  ? "border-ink font-bold text-ink"
                  : "border-transparent text-muted",
              )}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
