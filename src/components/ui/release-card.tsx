import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/** RELEASE_ver1 — node 148:1773 (가로형 소식 카드) */
export function ReleaseCard({
  imageSrc,
  imageAlt = "",
  label,
  title,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  label: string;
  title: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex w-full items-center gap-4 rounded-card border border-line bg-white p-2 pl-4",
        className,
      )}
    >
      <div className="relative size-20 shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 text-[14px] text-ink">
        <p className="truncate">{label}</p>
        <p className="truncate font-bold">{title}</p>
      </div>
    </article>
  );
}

/** RELEASE_ver2 — node 148:2952 (정사각 타일 + hover 오버레이) */
export function ReleaseTile({
  imageSrc,
  imageAlt = "",
  title,
  description,
  className,
}: {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative aspect-square w-full overflow-hidden",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 768px) 50vw, 317px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/80 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute inset-x-[7.57%] bottom-[7.65%] flex flex-col gap-1 text-[14px] text-white opacity-0 transition-opacity group-hover:opacity-100">
        <p className="font-bold">{title}</p>
        <p className="font-medium">{description}</p>
      </div>
    </article>
  );
}
