import { cn } from "@/lib/utils/cn";

/**
 * 가로 분할 정보 띠 — node 277:6492 (적립금/예치금) · 277:6511 (주문 상태 카운트)
 * line 테두리 한 겹에 98px 높이의 칸을 균등 분할하고, 칸 사이만 세로선을 둔다.
 * 시안의 두 용례는 제목/값 순서만 반대라 `reverse`로 흡수했다.
 */
export type InfoStripCell = {
  label: string;
  value: string;
  /** 제목 아래 붙는 부연 (예: "(최근 3개월 기준)") */
  note?: string;
};

export function InfoStrip({
  cells,
  reverse = false,
  className,
}: {
  cells: InfoStripCell[];
  /** true면 값이 위, 라벨이 아래 (주문 상태 카운트 배치) */
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-stretch overflow-hidden rounded-field border border-line bg-white",
        className,
      )}
    >
      {cells.map((cell, index) => (
        <div
          key={cell.label}
          className={cn(
            "flex h-[98px] flex-1 flex-col justify-center gap-2 pl-5",
            index > 0 && "border-l border-line",
          )}
        >
          {reverse ? (
            <>
              <p className="text-[16px] font-bold text-ink">{cell.value}</p>
              <p className="text-[14px] text-muted">{cell.label}</p>
            </>
          ) : (
            <>
              <p className="text-[16px] font-bold text-ink">{cell.label}</p>
              {cell.note && <p className="text-[13px] text-muted">{cell.note}</p>}
              {!cell.note && <p className="text-[14px] text-muted">{cell.value}</p>}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
