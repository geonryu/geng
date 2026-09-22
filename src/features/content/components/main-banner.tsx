"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import { SlideButton } from "@/components/ui/slide-controls";
import { cn } from "@/lib/utils/cn";
import type { MainBannerSlide } from "@/features/content/types";

/**
 * main_banner — node 277:5085
 *
 * PC: 369×400 슬라이드가 16px 간격으로 늘어서고, 뷰포트(1140)보다 넓어 좌우로 한 장씩
 *     엿보인다. 엿보이는 칸은 검정 40%로 덮인다. 하단에는 1140폭 진행 바 + 16px 컨트롤.
 * MO: 335×335 정사각 한 장만 보이고, 우하단에 "1/4" 카운터 pill이 붙는다 (node 290:13089).
 *
 * 시안은 5칸 고정이지만 슬라이드 수는 데이터가 정하므로, 중앙 3칸을 활성으로 두고
 * 앞뒤 한 칸씩을 딤 처리하는 규칙으로 일반화했다.
 */

/** 한 번에 보여줄 활성 슬라이드 수 (PC). 시안의 가운데 3칸. */
const VISIBLE = 3;
const AUTOPLAY_MS = 5000;

export function MainBanner({ slides }: { slides: MainBannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const count = slides.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    if (!playing || count <= 1) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing, next, count]);

  if (count === 0) return null;

  /** 현재 위치를 기준으로 [딤, 활성×3, 딤] 순서의 창을 만든다. */
  const window_ = Array.from({ length: VISIBLE + 2 }, (_, offset) => {
    const slideIndex = (index + offset - 1 + count * 2) % count;
    return { slide: slides[slideIndex], dimmed: offset === 0 || offset === VISIBLE + 1 };
  });

  const progress = ((index + 1) / count) * 100;

  return (
    <section aria-label="주요 소식" className="flex flex-col gap-4">
      {/* MO — 정사각 한 장 */}
      <div className="px-5 lg:hidden">
        <MobileSlide
          slide={slides[index]}
          current={index + 1}
          total={count}
          playing={playing}
          onTogglePlay={() => setPlaying((value) => !value)}
        />
      </div>

      {/* PC — 좌우로 엿보이는 캐러셀. 1140 기준 밖으로 넘치므로 뷰포트 전체를 쓴다. */}
      <div className="hidden overflow-hidden lg:block">
        <div className="flex items-center justify-center gap-4">
          {window_.map(({ slide, dimmed }, offset) => (
            <div
              key={`${slide.id}-${offset}`}
              className="relative h-[400px] w-[369px] shrink-0 overflow-hidden rounded-card"
              aria-hidden={dimmed}
            >
              <Image
                src={slide.imageSrc}
                alt={dimmed ? "" : slide.imageAlt}
                fill
                sizes="369px"
                priority={offset === 1}
                className="object-cover"
              />
              {/* 문구 가독성용 하단 그라데이션 (시안: 71% 지점부터 20%) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[71%] to-black/20" />

              {dimmed ? (
                <div className="absolute inset-0 bg-black/40" />
              ) : (
                <Link
                  href={slide.href}
                  className="absolute inset-0 flex flex-col justify-end gap-2 p-5 text-white"
                >
                  <p className="text-[24px]/[1.4] font-bold">
                    {slide.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <p className="text-[14px]/[1.8] font-medium">
                    {slide.subtitle}
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 진행 바 + 컨트롤 — node 277:5108 */}
      <div className="mx-auto hidden w-full max-w-content items-center gap-3 lg:flex">
        <div className="h-1 flex-1 bg-line">
          <div
            className="h-full bg-ink transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-3">
          <SlideButton direction="left" size="mini" active onClick={prev} />
          <SlideButton direction="right" size="mini" active onClick={next} />
          <button
            type="button"
            aria-label={playing ? "슬라이드 정지" : "슬라이드 재생"}
            onClick={() => setPlaying((value) => !value)}
            className="text-ink"
          >
            {playing ? (
              <PauseIcon className="size-4" />
            ) : (
              <PlayIcon className="size-4" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/** MO 단일 슬라이드 — node 290:13083 */
function MobileSlide({
  slide,
  current,
  total,
  playing,
  onTogglePlay,
}: {
  slide: MainBannerSlide;
  current: number;
  total: number;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-card">
      <Image
        src={slide.imageSrc}
        alt={slide.imageAlt}
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[71%] to-black/20" />

      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
        <Link href={slide.href} className="flex flex-col gap-[5px] text-white">
          <span className="text-[20px]/[1.4] font-bold">
            {slide.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
          <span className="text-[14px]/[1.8] font-medium">{slide.subtitle}</span>
        </Link>

        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={playing ? "슬라이드 정지" : "슬라이드 재생"}
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-pill bg-ink/25 px-[6px] py-[2px] text-[12px]",
          )}
        >
          <span className="text-white">{current}</span>
          <span className="text-white">/</span>
          <span className="text-line">{total}</span>
          {playing ? (
            <PauseIcon className="size-2 text-white" />
          ) : (
            <PlayIcon className="size-2 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
