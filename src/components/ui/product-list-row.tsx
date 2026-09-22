import Image from "next/image";

import { LikeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 가로형 상품 행 — node 277:5203 (PC 서브배너 하단) · 290:13243 (MO Product 목록)
 * 썸네일 + 상품명/가격 + 찜하기로 구성된다. PC는 썸네일 88px·가격 14px,
 * MO는 86px·가격 15px에 할인율을 가격 앞에 붙이는 차이만 있어 한 컴포넌트로 합쳤다.
 */
export type ProductListItem = {
  id: string;
  imageSrc: string;
  title: string;
  price: string;
  /** 할인율. 있으면 가격 앞에 sale 색으로 붙는다 (node 290:13256) */
  saleRate?: string;
};

export function ProductListRow({
  item,
  liked = false,
  onToggleLike,
  className,
}: {
  item: ProductListItem;
  liked?: boolean;
  onToggleLike?: () => void;
  className?: string;
}) {
  return (
    <article className={cn("flex items-center gap-[10px]", className)}>
      <div className="relative size-[86px] shrink-0 lg:size-[88px]">
        <Image
          src={item.imageSrc}
          alt=""
          fill
          sizes="88px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-[6px]">
        <div className="flex min-w-0 flex-col gap-[5px] lg:gap-4">
          <p className="line-clamp-2 text-[14px] font-medium text-ink">
            {item.title}
          </p>
          <p className="flex gap-[5px] text-[15px] font-bold whitespace-nowrap lg:text-[14px]">
            {item.saleRate && <span className="text-sale">{item.saleRate}</span>}
            <span className="text-ink">{item.price}</span>
          </p>
        </div>

        <button
          type="button"
          aria-label={liked ? "찜 해제" : "찜하기"}
          aria-pressed={liked}
          onClick={onToggleLike}
          className="shrink-0 text-ink"
        >
          <LikeIcon />
        </button>
      </div>
    </article>
  );
}
