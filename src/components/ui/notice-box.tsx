import { cn } from "@/lib/utils/cn";

/**
 * 회색 안내 박스 — node 277:7767 (장바구니 이용안내)
 * surface-soft 배경 · 5px 라운드 · 24px 패딩. 제목 14px Bold, 항목 13px에 ∙ 불릿.
 */
export function NoticeBox({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex w-full flex-col gap-6 rounded-field bg-surface-soft p-6",
        className,
      )}
    >
      <h3 className="text-[14px] font-bold text-ink">{title}</h3>
      <ul className="flex flex-col gap-[6px] text-[13px] text-ink">
        {items.map((item) => (
          <li key={item} className="flex gap-1">
            <span aria-hidden="true">∙</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
