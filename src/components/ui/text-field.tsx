"use client";

import { useId, useState } from "react";

import { CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 언더라인 입력 — node 277:6086(빈 상태) · 277:5928(포커스) · 277:8177(입력 완료)
 * 시안의 라벨은 값이 없을 때 입력 자리에 있다가, 포커스·입력 시 12px로 위로 올라간다.
 * 값이 있으면 오른쪽에 지우기(✕)가 붙는다.
 */
export function TextField({
  label,
  value,
  onValueChange,
  className,
  onFocus,
  onBlur,
  ...props
}: Omit<React.ComponentProps<"input">, "value" | "onChange"> & {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  return (
    <div
      className={cn(
        "relative h-[45px] w-full border-b border-line bg-white",
        className,
      )}
    >
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 text-muted transition-all",
          floating
            ? "top-[2px] text-[12px]"
            : "top-1/2 -translate-y-1/2 text-[16px]",
        )}
      >
        {label}
      </label>

      <input
        id={id}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        className={cn(
          "absolute inset-x-0 w-full bg-transparent pr-6 text-[16px] text-ink outline-none",
          // 라벨이 올라가면 입력은 아래 절반만 쓴다.
          floating ? "bottom-[4px] h-[22px]" : "inset-y-0",
        )}
        {...props}
      />

      {value.length > 0 && (
        <button
          type="button"
          aria-label={`${label} 지우기`}
          onClick={() => onValueChange("")}
          className="absolute top-1/2 right-0 -translate-y-1/2 text-muted"
        >
          <CloseIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

/**
 * 박스 입력 — node 277:7893 (회원가입 폼)
 * 45px · line 테두리 · 5px 라운드. 라벨은 FormField가 위에 따로 붙인다.
 */
export function BoxField({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-[45px] w-full rounded-field border border-line bg-white px-5 py-[14px]",
        "text-[14px] text-ink placeholder:text-muted focus:border-ink focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}
