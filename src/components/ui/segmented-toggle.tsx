import { cn } from "@/lib/utils/cn";

/**
 * 분할 토글 — node 277:6080 (회원/비회원) · 277:7624 (국내배송/해외배송)
 *              · 277:7862 (개인/사업자/외국인회원, 3분할)
 * 기존 SegmentedTabs(TAP_ver1)와 달리 45px 박스에 5px 라운드를 양 끝에만 준다.
 * 활성 칸은 ink 배경 + 흰 볼드, 비활성은 흰 배경 + line 테두리 + muted.
 *
 * size: "lg" 16px — 로그인·장바구니 / "sm" 14px — 회원가입 폼
 */
export type SegmentedToggleItem = {
  id: string;
  label: string;
  /** "(1)" 처럼 라벨 뒤에 붙는 보조 수치 */
  suffix?: string;
};

export function SegmentedToggle({
  items,
  activeId,
  onSelect,
  size = "lg",
  className,
}: {
  items: SegmentedToggleItem[];
  activeId: string;
  onSelect?: (id: string) => void;
  size?: "lg" | "sm";
  className?: string;
}) {
  return (
    <div className={cn("flex w-full items-center", className)}>
      {items.map((item, index) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={onSelect ? () => onSelect(item.id) : undefined}
            className={cn(
              "flex h-[45px] flex-1 items-center justify-center gap-1",
              size === "lg" ? "text-[16px]" : "text-[14px]",
              index === 0 && "rounded-l-field",
              index === items.length - 1 && "rounded-r-field",
              active
                ? "bg-ink font-bold text-white"
                : "border border-line bg-white text-muted",
            )}
          >
            <span>{item.label}</span>
            {item.suffix && <span>{item.suffix}</span>}
          </button>
        );
      })}
    </div>
  );
}
