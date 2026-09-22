"use client";

import { cn } from "@/lib/utils/cn";

export type TabItem = {
  id: string;
  label: string;
};

/**
 * TAP_ver1 — node 148:2268(3분할) / 148:1963(4분할).
 * 시안은 1340px 고정폭이지만 분할 수만 다른 같은 구조라 하나의 컴포넌트로 통합하고,
 * 반응형을 위해 컨테이너 폭을 균등 분할한다.
 *
 * size: "lg" 50px — 컴포넌트 모음 원형
 *       "sm" 36px — 최종화면 메인이 쓰는 높이 (node 277:5153 · 277:5241)
 */
export function SegmentedTabs({
  items,
  activeId,
  onSelect,
  size = "lg",
  className,
}: {
  items: TabItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  size?: "lg" | "sm";
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        // 좁은 화면에서는 라벨이 잘리는 대신 가로 스크롤로 넘긴다.
        "flex w-full items-stretch overflow-x-auto",
        size === "lg" ? "h-[50px]" : "h-9",
        className,
      )}
    >
      {items.map((item, index) => {
        const isActive = item.id === activeId;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "flex min-w-[128px] flex-1 items-center justify-center border-y px-2 text-[13px] transition-colors sm:text-[16px] lg:min-w-0",
              isActive
                ? "border-ink bg-ink font-bold text-white"
                : "border-line bg-white text-ink",
              isFirst && "rounded-l-card border-l",
              isLast && "rounded-r-card border-r",
              isActive && "border-x",
            )}
          >
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * TAP_ver2 — node 148:2999 (pill 형태)
 *
 * variant: "soft"    — 컴포넌트 모음 원형 (surface-soft 배경, 16px)
 *          "outline" — 최종화면 모바일 탭 (흰 배경 + line 테두리, 14px, node 290:13127)
 */
export function PillTabs({
  items,
  activeId,
  onSelect,
  variant = "soft",
  className,
}: {
  items: TabItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  variant?: "soft" | "outline";
  className?: string;
}) {
  const isOutline = variant === "outline";
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center",
        isOutline ? "gap-[6px]" : "flex-wrap gap-2",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "rounded-pill whitespace-nowrap transition-colors",
              isOutline
                ? cn(
                    "px-3 py-[7.5px] text-[14px]",
                    isActive
                      ? "bg-ink font-medium text-white"
                      : "border border-line bg-white text-ink",
                  )
                : cn(
                    "text-[16px]",
                    isActive
                      ? "bg-ink px-[19px] py-[9px] font-bold text-white"
                      : "border border-line-soft bg-surface-soft px-[18px] py-[8px] text-ink",
                  ),
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
