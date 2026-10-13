import { LocaleLink } from "@/components/ui/locale-link";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRightIcon } from "./icons";

/** BUTTON_go — node 148:2896 (Default / Variant2=화살표 / Variant3=화이트+화살표) */
export type ButtonGoTone = "dark" | "light";

export function ButtonGo({
  children = "바로가기",
  tone = "dark",
  withArrow = false,
  href,
  className,
}: {
  children?: React.ReactNode;
  tone?: ButtonGoTone;
  withArrow?: boolean;
  href?: string;
  className?: string;
}) {
  const classes = cn(
    "relative inline-flex h-[42px] min-w-[142px] items-center justify-center rounded-button px-10 text-[14px] font-bold transition-opacity hover:opacity-90",
    tone === "dark" ? "bg-ink text-white" : "bg-white text-ink",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowUpRightIcon className="absolute right-[9px] top-[9px]" />
      )}
    </>
  );

  if (href) {
    return (
      <LocaleLink href={href} className={classes}>
        {content}
      </LocaleLink>
    );
  }

  return (
    <button type="button" className={classes}>
      {content}
    </button>
  );
}
