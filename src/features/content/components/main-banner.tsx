"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { BannerControls } from "@/components/ui/banner-controls";
import { ButtonGo } from "@/components/ui/button-go";
import { cn } from "@/lib/utils/cn";
import type { MainBannerSlide } from "../types";

/**
 * main_banner — node 148:1560
 * 좌측 타이틀(340px) + 우측 이미지 스택(825×412). 이미지 스택은 현재 슬라이드를 앞에,
 * 이전/다음 슬라이드를 뒤쪽 50% 투명도로 겹쳐 두는 시안 구성이다.
 * 시안의 px 좌표는 825×412 대비 %로 환산해 폭에 상관없이 같은 비율을 유지한다.
 */
const AUTOPLAY_MS = 5000;

export function MainBanner({ slides }: { slides: MainBannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const count = slides.length;
  const go = useCallback(
    (delta: number) => setIndex((prev) => (prev + delta + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || count < 2) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, count, go]);

  const current = slides[index];
  const previous = slides[(index - 1 + count) % count];
  const next = slides[(index + 1) % count];

  return (
    <section
      aria-label="메인 배너"
      aria-roledescription="carousel"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-6 lg:flex-row lg:items-end lg:gap-[175px] lg:px-gutter"
    >
      <div className="flex shrink-0 flex-col gap-[57px] pt-10 lg:w-[340px] lg:pt-20">
        <div className="flex flex-col items-start gap-9">
          <h2 className="text-[32px] leading-[1.4] font-bold text-ink lg:text-[40px]">
            {current.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-[14px] leading-[1.8] text-ink">
            {current.subtitle}
          </p>
          <ButtonGo href={current.href}>바로가기</ButtonGo>
        </div>

        <BannerControls
          playing={playing}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
          onTogglePlay={() => setPlaying((value) => !value)}
        />
      </div>

      <div
        aria-live="polite"
        className="relative aspect-[825/412] w-full lg:w-[825px]"
      >
        {/* slide_img03 — node 148:1557 */}
        <BackdropSlide slide={previous} className="left-0" />
        {/* slide_img02 — node 148:1558 */}
        <BackdropSlide slide={next} className="left-[39.39%]" />
        {/* slide_img01 — node 148:1559 */}
        <div className="absolute inset-y-0 left-[6.06%] w-[87.88%] overflow-hidden rounded-card shadow-[4px_4px_10px_0_rgba(21,21,21,0.03)]">
          <Image
            src={current.imageSrc}
            alt={current.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 90vw, 725px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function BackdropSlide({
  slide,
  className,
}: {
  slide: MainBannerSlide;
  className: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute top-[15.29%] h-[69.17%] w-[60.61%] overflow-hidden rounded-card opacity-50",
        className,
      )}
    >
      <Image
        src={slide.imageSrc}
        alt=""
        fill
        sizes="(max-width: 1024px) 60vw, 500px"
        className="object-cover"
      />
    </div>
  );
}
