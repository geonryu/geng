import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 수량 조절 — node 277:7676 (장바구니) · 277:8663 (상품상세 옵션)
 * 30px 정사각 3칸. 가운데 칸은 좌우 테두리를 빼고 위아래만 남긴다.
 */
export function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  min = 1,
  className,
}: {
  value: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  min?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <button
        type="button"
        aria-label="수량 줄이기"
        disabled={value <= min}
        onClick={onDecrease}
        className="flex size-[30px] items-center justify-center rounded-l-field border border-muted bg-white p-[3px] text-muted disabled:opacity-40"
      >
        <MinusIcon />
      </button>
      <div className="flex size-[30px] items-center justify-center border-y border-muted bg-white text-[14px] text-muted">
        {value}
      </div>
      <button
        type="button"
        aria-label="수량 늘리기"
        onClick={onIncrease}
        className="flex size-[30px] items-center justify-center rounded-r-field border border-muted bg-white p-[3px] text-muted"
      >
        <PlusIcon />
      </button>
    </div>
  );
}
