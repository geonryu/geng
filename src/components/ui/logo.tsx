import { cn } from "@/lib/utils/cn";

/** Gen.G 로고 — node 66:49 (Default=골드 / White / Black) */
export type LogoTone = "default" | "white" | "black";

const TONE_CLASS: Record<LogoTone, string> = {
  default: "text-geng-gold",
  white: "text-white",
  black: "text-ink",
};

export function Logo({
  tone = "default",
  className,
}: {
  tone?: LogoTone;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      role="img"
      aria-label="Gen.G"
      className={cn("size-[50px] shrink-0", TONE_CLASS[tone], className)}
    >
      <g transform="translate(1 5)" fill="currentColor">
        <path d="M0 0H21.2932V6.73684H7.21804V16.3609L14.3158 23.4586V16L10.3459 12.0301H21.2932V40.6617L0 19.3684V0Z" />
        <path d="M48 0H26.7068V6.73684H40.782V16.3609L33.6842 23.4586V16L37.6541 12.0301H26.7068V40.6617L48 19.3684V0Z" />
      </g>
    </svg>
  );
}
