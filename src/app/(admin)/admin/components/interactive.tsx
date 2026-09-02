"use client";

import { useState } from "react";
import { BannerControls } from "@/components/ui/banner-controls";
import { SlideBar } from "@/components/ui/slide-bar";
import { SlideButton, SlideDots } from "@/components/ui/slide-controls";
import { PillTabs, SegmentedTabs, type TabItem } from "@/components/ui/tabs";

const CATEGORY_TABS: TabItem[] = [
  { id: "pro-kit", label: "2026 PRO KIT" },
  { id: "cheering", label: "CHEERING GEAR" },
  { id: "genrang", label: "GENRANG" },
  { id: "collectibles", label: "COLLECTIBLES" },
];

const CURATION_TABS: TabItem[] = [
  { id: "best", label: "BEST" },
  { id: "md", label: "MD’s PICK" },
  { id: "new", label: "NEW" },
];

const SLIDES = [
  "2026 2nd Official Player Uniform",
  "2026 1st Official Uniform",
  "GenRang merch",
  "2026 Membership",
];

/** 상태가 필요한 컴포넌트들의 동작 확인용 데모 */
export function InteractiveTabs() {
  const [segmented, setSegmented] = useState(CATEGORY_TABS[0].id);
  const [curation, setCuration] = useState(CURATION_TABS[0].id);
  const [pill, setPill] = useState(CATEGORY_TABS[0].id);

  return (
    <div className="flex flex-col gap-6">
      <SegmentedTabs
        items={CATEGORY_TABS}
        activeId={segmented}
        onSelect={setSegmented}
      />
      <SegmentedTabs
        items={CURATION_TABS}
        activeId={curation}
        onSelect={setCuration}
      />
      <PillTabs items={CATEGORY_TABS} activeId={pill} onSelect={setPill} />
    </div>
  );
}

export function InteractiveSlideControls() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const last = SLIDES.length - 1;

  const prev = () => setIndex((i) => (i === 0 ? last : i - 1));
  const next = () => setIndex((i) => (i === last ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-4">
        <SlideButton direction="left" active onClick={prev} />
        <SlideDots
          count={SLIDES.length}
          activeIndex={index}
          onSelect={setIndex}
        />
        <SlideButton direction="right" active onClick={next} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <SlideButton direction="left" size="small" active onClick={prev} />
        <SlideButton direction="right" size="small" active onClick={next} />
        <BannerControls
          playing={playing}
          onPrev={prev}
          onNext={next}
          onTogglePlay={() => setPlaying((p) => !p)}
        />
      </div>
      <p className="text-center text-[13px] text-[#666]">
        현재 슬라이드: {index + 1} / {SLIDES.length} · {playing ? "재생 중" : "정지"}
      </p>
    </div>
  );
}

export function InteractiveSlideBar() {
  const [index, setIndex] = useState(0);
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {SLIDES.map((label, i) => (
        <SlideBar
          key={label}
          label={label}
          active={i === index}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  );
}
