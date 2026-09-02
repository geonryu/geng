import { cn } from "@/lib/utils/cn";

/**
 * slide_bar — node 148:2892
 * 메인 배너(어두운 이미지) 위에 얹히는 슬라이드 인디케이터. 활성 시 6px 흰 바 + 볼드 라벨,
 * 비활성 시 2px 회색 바 + 회색 라벨.
 */
export function SlideBar({
  label,
  active = false,
  onClick,
  className,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[47px] w-full flex-col items-start gap-2 text-left",
        className,
      )}
    >
      <span
        className={cn(
          "w-full rounded-full",
          active ? "h-[6px] bg-white" : "mt-[4px] h-[2px] bg-on-dark-idle",
        )}
      />
      <span
        className={cn(
          "truncate text-[16px] leading-[1.4] sm:text-[18px]",
          active ? "font-bold text-white" : "text-on-dark-idle",
        )}
      >
        {label}
      </span>
    </button>
  );
}
