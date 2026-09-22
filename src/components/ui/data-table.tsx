import { cn } from "@/lib/utils/cn";

/**
 * 내역 표 — node 277:6785 (주문/배송내역) · 적립금·예치금 내역이 같은 형태를 쓴다.
 * 머리글 줄은 ink 배경에 흰 볼드 16px(45px), 본문은 35px에 14px.
 * 셀 사이는 line 세로선, 마지막 줄만 ink 가로선으로 닫는다.
 */
export type DataTableColumn = {
  key: string;
  label: string;
  /** 시안의 열 폭 비율. 합이 전체가 된다 */
  width: number;
  align?: "start" | "center";
};

export function DataTable({
  columns,
  rows,
  className,
}: {
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  className?: string;
}) {
  const template = columns.map((column) => `${column.width}fr`).join(" ");

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-[720px]">
        <div
          className="grid h-[45px] overflow-hidden rounded-t-field bg-ink"
          style={{ gridTemplateColumns: template }}
        >
          {columns.map((column) => (
            <span
              key={column.key}
              className="flex items-center justify-center text-[16px] font-bold text-white"
            >
              {column.label}
            </span>
          ))}
        </div>

        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "grid h-[35px] border-b",
              rowIndex === rows.length - 1 ? "border-ink" : "border-line",
            )}
            style={{ gridTemplateColumns: template }}
          >
            {columns.map((column, columnIndex) => (
              <span
                key={column.key}
                className={cn(
                  "flex h-[35px] items-center truncate text-[14px] text-ink",
                  columnIndex > 0 && "border-l border-line",
                  column.align === "start"
                    ? "justify-start pl-5"
                    : "justify-center",
                )}
              >
                {row[column.key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
