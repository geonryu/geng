import { cn } from "@/lib/utils/cn";

/** 상단 슬로건 바 — node 148:1460 */
export function Slogan({
  messages = ["#CHANGE THE GAME", "#CHANGE THE WORLD"],
  className,
}: {
  messages?: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center justify-center gap-x-1 bg-ink px-4 py-4 text-[12px] font-bold text-white sm:text-[14px]",
        className,
      )}
    >
      {messages.map((message) => (
        <span key={message}>{message}</span>
      ))}
    </div>
  );
}
