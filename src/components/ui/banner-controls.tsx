"use client";

import { cn } from "@/lib/utils/cn";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PauseIcon,
  PlayIcon,
} from "./icons";

/**
 * 메인 배너 재생 컨트롤 — node 148:1547 (arrow(L) / arrow(R) / pause · start)
 * 아이콘 세 개가 40px 간격으로 놓이는 시안 구성을 그대로 컴포넌트화했다.
 */
export function BannerControls({
  playing = true,
  onPrev,
  onNext,
  onTogglePlay,
  className,
}: {
  playing?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onTogglePlay?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4 text-ink", className)}>
      <button type="button" aria-label="이전 슬라이드" onClick={onPrev}>
        <ArrowLeftIcon />
      </button>
      <button type="button" aria-label="다음 슬라이드" onClick={onNext}>
        <ArrowRightIcon />
      </button>
      <button
        type="button"
        aria-label={playing ? "슬라이드 정지" : "슬라이드 재생"}
        onClick={onTogglePlay}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}
