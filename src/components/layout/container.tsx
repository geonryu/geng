import { cn } from "@/lib/utils/cn";

/**
 * 본문 폭 컨테이너 — 최종화면(node 277:5038)은 1440 기준 좌우 150px,
 * 즉 1140px 고정폭을 모든 페이지에서 공유한다. 토큰 `--container-content`에 있다.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-6 lg:px-0", className)}>
      {children}
    </div>
  );
}
