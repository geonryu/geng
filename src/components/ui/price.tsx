import { cn } from "@/lib/utils/cn";
import { formatWon } from "@/lib/utils/price";

/**
 * 가격 표기 — node 277:7670 (장바구니) · 277:8636 (상품상세)
 * 시안은 숫자만 Bold, 단위("원")는 Regular로 한 단계 작게 쓴다.
 * 할인이 있으면 정가를 취소선으로 위에 올린다.
 *
 * 금액은 원 단위 정수로 받고 포맷은 여기서 한다.
 */
export function Price({
  amount,
  unit = "원",
  originalAmount,
  size = "md",
  align = "start",
  className,
}: {
  amount: number;
  unit?: string;
  originalAmount?: number;
  size?: "sm" | "md" | "lg";
  align?: "start" | "center";
  className?: string;
}) {
  const valueSize =
    size === "lg" ? "text-[24px]" : size === "md" ? "text-[16px]" : "text-[14px]";
  const unitSize =
    size === "lg" ? "text-[24px]" : size === "md" ? "text-[14px]" : "text-[14px]";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
    >
      {originalAmount !== undefined && (
        <p className="text-[14px] text-muted line-through">
          {formatWon(originalAmount)}
          {unit}
        </p>
      )}
      <p className="flex items-center whitespace-nowrap text-ink">
        <span className={cn("font-bold", valueSize)}>{formatWon(amount)}</span>
        <span className={unitSize}>{unit}</span>
      </p>
    </div>
  );
}
