import { MainBanner } from "@/features/content/components/main-banner";
import { ReleaseStrip } from "@/features/content/components/release-strip";
import { SubBannerSection } from "@/features/content/components/sub-banner-section";
import { ProductShowcase } from "@/features/products/components/product-showcase";

import {
  MAIN_BANNER_SLIDES,
  POPULAR_TABS,
  PRODUCT_TABS,
  RELEASE_ITEMS,
  SUB_BANNER_ITEMS,
} from "./main-page-data";

/**
 * 메인 화면 — Figma 젠지온라인리뉴얼 / 화면 / 메인시안1_PC (node 150:3232)
 * 시안의 세로 리듬: 헤더 아래 70px → 배너 → 36px → Release → 100px 간격 섹션 → 푸터 위 70px.
 */
export default function StorefrontHomePage() {
  return (
    <div className="flex flex-col gap-16 py-10 lg:gap-25 lg:py-[70px]">
      <div className="flex flex-col gap-9">
        <MainBanner slides={MAIN_BANNER_SLIDES} />
        <ReleaseStrip items={RELEASE_ITEMS} />
      </div>

      <ProductShowcase title="Most Popular" tabs={POPULAR_TABS} />

      <SubBannerSection items={SUB_BANNER_ITEMS} />

      <ProductShowcase title="Product" tabs={PRODUCT_TABS} />
    </div>
  );
}
