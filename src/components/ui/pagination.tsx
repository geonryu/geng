"use client";

import { SlideButton } from "@/components/ui/slide-controls";
import { cn } from "@/lib/utils/cn";

/**
 * 페이지 이동 — node 277:6909
 * 24px 슬라이드 버튼 두 개 사이에 쪽 번호를 둔다. 현재 쪽은 ink, 나머지는 control.
 */
export function Pagination({
  page,
  pageCount,
  onChange,
  className,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <SlideButton
        direction="left"
        size="small"
        active={page > 1}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      />

      <div className="flex items-center gap-4">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (value) => (
            <button
              key={value}
              type="button"
              aria-current={value === page ? "page" : undefined}
              onClick={() => onChange(value)}
              className={cn(
                "text-[16px] font-bold",
                value === page ? "text-ink" : "text-control",
              )}
            >
              {value}
            </button>
          ),
        )}
      </div>

      <SlideButton
        direction="right"
        size="small"
        active={page < pageCount}
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
      />
    </div>
  );
}
