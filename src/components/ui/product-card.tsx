import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * PRODUCT — node 148:2087
 * Default / 2line/default / 1line/sale / 2line/sale 네 개 variant를
 * `titleLines` + `sale` 조합으로 표현한다.
 */
export type ProductSale = {
  /** 할인율 표기 (예: "50%") */
  rate: string;
  /** 정가 */
  originalPrice: string;
};

export function ProductCard({
  imageSrc,
  imageAlt = "",
  title,
  price,
  titleLines = 1,
  sale,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  price: string;
  titleLines?: 1 | 2;
  sale?: ProductSale;
  className?: string;
}) {
  return (
    <article className={cn("flex w-full flex-col gap-4", className)}>
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
          titleLines === 1 && !sale ? "gap-6" : "gap-2",
        )}
      >
        <p
          className={cn(
            "text-[14px] font-medium",
            titleLines === 2 ? "line-clamp-2" : "truncate",
          )}
        >
          {title}
        </p>

        {sale ? (
          <div className="flex flex-col">
            <p className="text-[13px] font-medium line-through">
              {sale.originalPrice}
            </p>
            <p className="flex gap-2 text-[16px] font-bold whitespace-nowrap">
              <span className="text-sale">{sale.rate}</span>
              <span>{price}</span>
            </p>
          </div>
        ) : (
          <p className="text-[16px] font-bold">{price}</p>
        )}
      </div>
    </article>
  );
}
