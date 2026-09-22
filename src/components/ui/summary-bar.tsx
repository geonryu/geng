import { CircleEqualsIcon, CirclePlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 금액 합계 바 — node 277:7730 (장바구니)
 * ink 테두리 한 겹 안에 3칸을 두고, 칸 경계 위에 45px 원형 기호(+, =)를 겹친다.
 * 시안은 1140px 고정이지만 여기서는 칸을 균등 분할해 폭에 따라 늘어나게 했다.
 */
export type SummaryCell = {
  label: string;
  amount: string;
  unit?: string;
  /** 마지막 칸(결제 예정 금액)은 숫자를 ink로 강조한다 */
  emphasis?: boolean;
};

export function SummaryBar({
  cells,
  className,
}: {
  cells: [SummaryCell, SummaryCell, SummaryCell];
  className?: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className="flex w-full items-stretch border border-ink">
        {cells.map((cell, index) => (
          <div
            key={cell.label}
            className={cn(
              "flex h-[98px] flex-1 flex-col items-center justify-center gap-3 bg-white",
              index === 1 && "border-x border-line",
            )}
          >
            <p className="text-center text-[13px] text-muted">{cell.label}</p>
            <p className="flex items-center justify-center whitespace-nowrap">
              <span
                className={cn(
                  "text-[16px] font-bold",
                  cell.emphasis ? "text-ink" : "text-muted",
                )}
              >
                {cell.amount}
              </span>
              <span className="text-[14px] text-muted">{cell.unit ?? "원"}</span>
            </p>
          </div>
        ))}
      </div>

      {/* 칸 경계(1/3, 2/3) 위에 겹치는 연결 기호 */}
      <CirclePlusIcon className="pointer-events-none absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 text-muted" />
      <CircleEqualsIcon className="pointer-events-none absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 text-muted" />
    </div>
  );
}
