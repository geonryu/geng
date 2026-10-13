import Image from "next/image";
import Link from "next/link";

import { LikeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";
import { calcSaleRate, formatWonUnit } from "@/lib/utils/price";

/**
 * 가로형 상품 행 — node 277:5203 (PC 서브배너 하단) · 290:13243 (MO Product 목록)
 * 썸네일 + 상품명/가격 + 찜하기로 구성된다. PC는 썸네일 88px·가격 14px,
 * MO는 86px·가격 15px에 할인율을 가격 앞에 붙이는 차이만 있어 한 컴포넌트로 합쳤다.
 *
 * 금액은 원 단위 정수로 받고, 할인율은 정가에서 계산한다.
 * `href`가 있으면 썸네일·상품명 영역이 상품상세 링크가 된다. 찜하기 버튼은
 * 링크 안에 중첩되면 안 되므로 링크 바깥 형제로 둔다.
 */
export type ProductListItem = {
  id: string;
  imageSrc: string;
  title: string;
  price: number;
  /** 정가. 있으면 할인율을 계산해 가격 앞에 sale 색으로 붙인다 (node 290:13256) */
  originalPrice?: number;
  href?: string;
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
  const saleRate = calcSaleRate(item.price, item.originalPrice);
  const Content = item.href ? Link : "div";
  const contentProps = item.href ? { href: item.href } : {};

  return (
    <article className={cn("flex items-center gap-[6px]", className)}>
      <Content
        {...(contentProps as { href: string })}
        className="flex min-w-0 flex-1 items-center gap-[10px]"
      >
        <div className="relative size-[86px] shrink-0 lg:size-[88px]">
          <Image
            src={item.imageSrc}
            alt=""
            fill
            sizes="88px"
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[5px] lg:gap-4">
          <p className="line-clamp-2 text-[14px] font-medium text-ink">
            {item.title}
          </p>
          <p className="flex gap-[5px] text-[15px] font-bold whitespace-nowrap lg:text-[14px]">
            {saleRate && <span className="text-sale">{saleRate}</span>}
            <span className="text-ink">{formatWonUnit(item.price)}</span>
          </p>
        </div>
      </Content>

      <button
        type="button"
        aria-label={liked ? "찜 해제" : "찜하기"}
        aria-pressed={liked}
        onClick={onToggleLike}
        className="shrink-0 text-ink"
      >
        <LikeIcon />
      </button>
    </article>
  );
}
