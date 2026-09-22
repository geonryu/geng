import { cn } from "@/lib/utils/cn";

/**
 * 폼 항목 — node 277:7858 외 (회원가입 폼)
 * 라벨 14px Bold, 필수 항목은 앞에 작은 별표가 붙는다 (node 277:7860).
 */
export function FormField({
  label,
  required = false,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      <p className="flex items-center gap-1 text-[14px] font-bold text-ink">
        {required && (
          <span aria-hidden="true" className="text-[10px] leading-none">
            ✳
          </span>
        )}
        {label}
        {required && <span className="sr-only">(필수)</span>}
      </p>
      {children}
    </div>
  );
}
