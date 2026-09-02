import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { ArrowUpRightIcon } from "./icons";

/** SUB_BANNER_ver1 — node 148:2302 (카드형: 이미지 + 우측 타이틀/화살표) */
export function SubBanner({
  imageSrc,
  imageAlt = "",
  title,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        // 시안은 이미지 + 우측 144px 컬럼의 가로 배치다. 좁은 화면에서는 세로로 쌓는다.
        "flex w-full flex-col gap-4 rounded-card border border-line bg-white p-5 sm:flex-row sm:items-center sm:gap-6",
        className,
      )}
    >
      <div className="relative aspect-[450/280] w-full min-w-0 overflow-hidden rounded-card sm:flex-1">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, 450px"
          className="object-cover"
        />
      </div>
      {/* 우측 컬럼은 시안(node 148:2300)대로 아래 정렬 + 타이틀·화살표 사이 107px */}
      <div className="flex w-full shrink-0 items-center justify-between gap-4 sm:w-[144px] sm:flex-col sm:items-end sm:justify-end sm:gap-[107px] sm:self-stretch">
        <p className="text-[14px] font-bold text-ink sm:w-full">{title}</p>
        <ArrowUpRightIcon className="shrink-0 text-ink" />
      </div>
    </article>
  );
}

/** SUB_BANNER_ver2 — node 148:3161 (와이드 이미지형. Variant2는 캐러셀 비활성 딤 처리) */
export function SubBannerWide({
  imageSrc,
  imageAlt = "",
  dimmed = false,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  dimmed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[546/315] w-full overflow-hidden",
        dimmed
          ? "rounded-banner"
          : "rounded-banner rounded-tr-[50px]",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 1024px) 90vw, 546px"
        className="object-cover"
      />
      {dimmed && <div className="absolute inset-0 bg-ink/80" />}
    </div>
  );
}
