import { cn } from "@/lib/utils/cn";
import { GlobeIcon } from "./icons";

/** 국가 선택 배지 — node 148:2774 (global / Variant2). 어두운 배경 위에서 사용한다. */
export function LocaleBadge({
  locale = "KR",
  className,
}: {
  locale?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-[50px] border-2 border-white px-[10px] py-[2px] text-[16px] font-bold text-white",
        className,
      )}
    >
      <GlobeIcon />
      {locale}
    </span>
  );
}
