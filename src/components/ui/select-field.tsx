import { ChevronToggleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * OPTION 셀렉트 — node 277:8649 (상품상세 옵션 선택)
 * 45px · muted 테두리 · 5px 라운드. 네이티브 select 위에 셰브런을 겹쳐 둔다.
 */
export function SelectField({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className={cn("relative w-full", className)}>
      <select
        className={cn(
          "h-[45px] w-full appearance-none rounded-field border border-muted bg-white",
          "px-5 py-[14px] pr-10 text-[14px] font-medium text-ink focus:outline-none",
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronToggleIcon className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-ink" />
    </div>
  );
}
