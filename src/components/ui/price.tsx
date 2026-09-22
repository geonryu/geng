import { cn } from "@/lib/utils/cn";

/**
 * 가격 표기 — node 277:7670 (장바구니) · 277:8636 (상품상세)
 * 시안은 숫자만 Bold, 단위("원")는 Regular로 한 단계 작게 쓴다.
 * 할인이 있으면 정가를 취소선으로 위에 올린다.
 */
export function Price({
  amount,
  unit = "원",
  originalAmount,
  size = "md",
  align = "start",
  className,
}: {
  amount: string;
  unit?: string;
  originalAmount?: string;
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
      {originalAmount && (
        <p className="text-[14px] text-muted line-through">
          {originalAmount}
          {unit}
        </p>
      )}
      <p className="flex items-center whitespace-nowrap text-ink">
        <span className={cn("font-bold", valueSize)}>{amount}</span>
        <span className={unitSize}>{unit}</span>
      </p>
    </div>
  );
}
