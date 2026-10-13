import { LocaleLink } from "@/components/ui/locale-link";

import { ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 브레드크럼 — node 277:6073~6077 외 최종화면 전 페이지 공통.
 * 시안은 본문 시작선(좌 150px)에 맞춰 14px muted 텍스트 + 16px 셰브런을 둔다.
 * 마지막 항목도 시안에서는 같은 muted 색이라 강조하지 않는다.
 */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  return (
    <nav aria-label="현재 위치" className={className}>
      <ol className="flex flex-wrap items-center text-[14px] text-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="mx-2 text-muted" />
            )}
            {item.href ? (
              <LocaleLink href={item.href} className="hover:text-ink">
                {item.label}
              </LocaleLink>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** 브레드크럼과 본문 사이 간격까지 포함한 페이지 머리 (시안: 136px → 203px) */
export function PageHeading({
  items,
  className,
  children,
}: {
  items: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-[50px]", className)}>
      <Breadcrumb items={items} />
      {children}
    </div>
  );
}
