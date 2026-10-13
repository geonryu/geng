"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useState } from "react";

import { ChevronToggleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 좌측 접이식 메뉴 — node 277:6420 / 277:6433 (마이페이지)
 * 그룹 제목 16px Bold + 셰브런, 항목 14px에 12px 간격.
 * 시안은 모든 그룹이 펼쳐진 상태이며, 셰브런은 접기 어포던스로만 존재한다.
 */
export type SideNavItem = {
  label: string;
  href: string;
};

export type SideNavGroup = {
  id: string;
  title: string;
  items: SideNavItem[];
};

export function SideNav({
  groups,
  activeHref,
  className,
  children,
}: {
  groups: SideNavGroup[];
  activeHref?: string;
  className?: string;
  /** 메뉴 위에 얹히는 요약 카드 등 */
  children?: React.ReactNode;
}) {
  const [closedIds, setClosedIds] = useState<string[]>([]);

  return (
    <nav
      aria-label="마이페이지 메뉴"
      className={cn(
        "flex w-full flex-col gap-6 rounded-field border border-line p-[10px] pb-6",
        className,
      )}
    >
      {children}

      {groups.map((group) => {
        const open = !closedIds.includes(group.id);
        return (
          <div key={group.id} className="flex flex-col gap-3 px-[10px]">
            <button
              type="button"
              aria-expanded={open}
              onClick={() =>
                setClosedIds((ids) =>
                  open ? [...ids, group.id] : ids.filter((id) => id !== group.id),
                )
              }
              className="flex items-center justify-between"
            >
              <span className="text-[16px] font-bold text-ink">
                {group.title}
              </span>
              <ChevronToggleIcon
                direction={open ? "up" : "down"}
                className="text-muted"
              />
            </button>

            <ul hidden={!open} className="flex flex-col gap-3 text-[14px]">
              {group.items.map((item) => (
                <li key={item.href}>
                  <LocaleLink
                    href={item.href}
                    className={cn(
                      "block hover:text-ink",
                      item.href === activeHref
                        ? "font-bold text-ink"
                        : "text-ink",
                    )}
                  >
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
