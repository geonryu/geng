"use client";

import { useState } from "react";

import { ChevronToggleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 안내 아코디언 — node 277:8617 / 277:8622 / 277:8627 (상품상세 하단)
 * 63px 높이의 행에 라벨과 셰브런을 양 끝으로 두고 행마다 아래 테두리를 둔다.
 * 시안에는 닫힌 상태만 있어, 열린 상태는 같은 리듬(24px 패딩)으로 이어 붙였다.
 */
export type AccordionItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

export function Accordion({
  items,
  defaultOpenId,
  className,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}) {
  const [openId, setOpenId] = useState<string | undefined>(defaultOpenId);

  return (
    <div className={cn("flex w-full flex-col border-t border-line", className)}>
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="border-b border-line">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => setOpenId(open ? undefined : item.id)}
              className="flex h-[63px] w-full items-center justify-between text-left text-[14px] text-ink"
            >
              <span>{item.label}</span>
              <ChevronToggleIcon
                direction={open ? "up" : "down"}
                className="text-muted"
              />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              hidden={!open}
              className="pb-6 text-[14px] text-muted"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
