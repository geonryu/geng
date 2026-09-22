import { cn } from "@/lib/utils/cn";

/**
 * BUTTON — 최종화면(node 277:5038) 전반에서 반복되는 버튼 체계.
 * Figma에 컴포넌트로 묶여 있지 않아 화면에서 역으로 도출했다.
 *
 * tone   solid(#151515) / outline(#666 테두리) / outline-strong(#151515 테두리) / muted(#f6f6f6)
 * size   sm 30px — 표·목록 안의 보조 동작 (node 277:7642, 277:7699)
 *        md 45px — 페이지 하단 주요 동작 (node 277:7761~7765)
 *        lg 45px/16px bold — 폼 제출 (node 277:6090)
 */
export type ButtonTone = "solid" | "outline" | "outline-strong" | "muted";
export type ButtonSize = "sm" | "md" | "lg";

const TONE: Record<ButtonTone, string> = {
  solid: "bg-ink text-white",
  outline: "border border-muted bg-white text-muted",
  "outline-strong": "border border-ink bg-white text-ink",
  muted: "bg-surface-soft text-muted",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-[30px] px-2 text-[14px]",
  md: "h-[45px] px-4 text-[14px] font-medium",
  lg: "h-[45px] px-4 text-[16px] font-bold",
};

export function buttonClass({
  tone = "solid",
  size = "md",
  fullWidth = false,
  className,
}: {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-field whitespace-nowrap",
    "transition-opacity hover:opacity-80 disabled:pointer-events-none disabled:opacity-60",
    TONE[tone],
    SIZE[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  tone,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & {
  tone?: ButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
}) {
  return (
    <button
      type={type}
      className={buttonClass({ tone, size, fullWidth, className })}
      {...props}
    />
  );
}
