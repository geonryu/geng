import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";

import { cn } from "@/lib/utils/cn";
import { calcSaleRate, formatWonUnit } from "@/lib/utils/price";

/**
 * PRODUCT — node 148:2087
 * Default / 2line/default / 1line/sale / 2line/sale 네 개 variant를
 * `titleLines` + `sale` 조합으로 표현한다.
 *
 * 금액은 원 단위 정수로 받고, 할인율은 정가·판매가에서 계산한다.
 * `href`가 있으면 카드 전체가 상품상세로 가는 링크가 된다.
 */
export type ProductSale = {
  /** 정가 */
  originalPrice: number;
};

export function ProductCard({
  imageSrc,
  imageAlt = "",
  title,
  price,
  href,
  titleLines = 1,
  sale,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  price: number;
  href?: string;
  titleLines?: 1 | 2;
  sale?: ProductSale;
  className?: string;
}) {
  const saleRate = sale ? calcSaleRate(price, sale.originalPrice) : null;
  const Root = href ? LocaleLink : "article";
  const rootProps = href ? { href } : {};

  return (
    <Root
      {...(rootProps as { href: string })}
      className={cn("flex w-full flex-col gap-4", className)}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 244px"
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "flex flex-col text-ink",
          // 모바일 카드는 제목이 2줄로 흐르므로 간격을 좁게 둔다 (node 290:13142).
          titleLines === 1 && !sale ? "gap-2 lg:gap-6" : "gap-2",
        )}
      >
        <p
          className={cn(
            "text-[14px] font-medium",
            // 좁은 화면에서는 한 줄 시안이라도 잘라내지 않고 두 줄까지 흘린다.
            titleLines === 2 ? "line-clamp-2" : "line-clamp-2 lg:truncate",
          )}
        >
          {title}
        </p>

        {sale ? (
          <div className="flex flex-col">
            <p className="text-[13px] font-medium line-through">
              {formatWonUnit(sale.originalPrice)}
            </p>
            <p className="flex gap-2 text-[16px] font-bold whitespace-nowrap">
              {saleRate && <span className="text-sale">{saleRate}</span>}
              <span>{formatWonUnit(price)}</span>
            </p>
          </div>
        ) : (
          <p className="text-[16px] font-bold">{formatWonUnit(price)}</p>
        )}
      </div>
    </Root>
  );
}
