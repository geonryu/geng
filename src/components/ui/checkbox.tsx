import { CheckMarkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * check01 / check02 — node 257:1234 · 257:1247
 * 두 컴포넌트는 모서리만 다르다(원형 / 5px 사각). active·deactive 두 variant를
 * `checked`로 흡수하고, 체크 글리프는 두 시안이 공유하는 export 벡터를 쓴다.
 *
 * 폼 안에서는 실제 input을 숨기지 않고 `<input type="checkbox" className="peer sr-only">`
 * 대신 접근성 유지를 위해 label로 감싸 쓰는 것을 전제로 한다.
 */
export function Checkbox({
  shape = "square",
  checked = false,
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "type"> & {
  shape?: "square" | "circle";
  checked?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex size-5 shrink-0", className)}>
      <input
        type="checkbox"
        checked={checked}
        className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0"
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none flex size-5 items-center justify-center border",
          shape === "circle" ? "rounded-full" : "rounded-field",
          checked
            ? "border-ink bg-ink text-white"
            : "border-line bg-white text-line",
        )}
      >
        <CheckMarkIcon className="size-5" />
      </span>
    </span>
  );
}
