import Image from "next/image";

import { cn } from "@/lib/utils/cn";

/**
 * 마이페이지 요약 카드 — node 277:6450 / 277:6465 / 277:6478
 * surface-soft 배경 · 150px 높이 · 24px 패딩. 좌상단 45px 아이콘, 우상단 제목,
 * 우하단에 값이 1~2줄 붙는다. 아이콘은 2톤(ink + sale)이라 export SVG를 그대로 쓴다.
 */
export type StatValue = {
  amount: string;
  unit: string;
};

export function StatCard({
  iconSrc,
  title,
  values,
  className,
}: {
  iconSrc: string;
  title: string;
  values: StatValue[];
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-[150px] flex-col rounded-field bg-surface-soft p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <span className="relative size-[45px] shrink-0">
          {/* SVG는 next/image 최적화 대상이 아니라 unoptimized로 원본을 그대로 내보낸다. */}
          <Image src={iconSrc} alt="" fill sizes="45px" unoptimized />
        </span>
        <h3 className="text-right text-[16px] font-bold text-ink">{title}</h3>
      </div>

      <div className="mt-auto flex flex-col items-end gap-1 text-muted">
        {values.map((value) => (
          <p key={value.unit} className="flex items-center whitespace-nowrap">
            <span className="text-[16px] font-bold">{value.amount}</span>
            <span className="text-[14px]">{value.unit}</span>
          </p>
        ))}
      </div>
    </article>
  );
}
