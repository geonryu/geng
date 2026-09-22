"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * 상품 이미지 갤러리 — node 277:5354(대표 550) · 277:5411~5416(썸네일 84 × 6)
 * PC는 대표 이미지 아래 썸네일 줄, MO는 썸네일 없이 대표 이미지만 두고
 * 우하단 카운터(node 277:5355)로 장수를 알린다.
 */
export function ProductGallery({
  images,
}: {
  images: { id: string; src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const active = images[index];

  if (!active) return null;

  return (
    <div className="flex flex-col gap-5 lg:w-[550px] lg:shrink-0">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 550px"
          priority
          className="object-cover"
        />
        <span className="absolute right-4 bottom-4 rounded-pill bg-ink/25 px-[6px] py-[2px] text-[12px] text-white">
          {index + 1}
          <span className="text-line"> / {images.length}</span>
        </span>
      </div>

      {/* 썸네일은 PC 전용 — MO 시안에는 없다 */}
      <ul className="hidden gap-2 lg:flex">
        {images.map((image, imageIndex) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`${imageIndex + 1}번째 이미지 보기`}
              aria-current={imageIndex === index}
              className={cn(
                "relative block size-[84px] overflow-hidden border",
                imageIndex === index ? "border-ink" : "border-transparent",
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="84px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
