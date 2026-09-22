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
 * 메인 화면 — Figma 젠지온라인리뉴얼 / 최종화면 / 메인_PC (node 277:5039), 메인_MO (node 290:13054)
 * 시안의 세로 리듬: 헤더 아래 16px → 배너 → 36px → Release → 섹션 간 56px → 푸터.
 */
export default function StorefrontHomePage() {
  return (
    <div className="flex flex-col gap-10 py-4 lg:gap-14 lg:py-4">
      <div className="flex flex-col gap-9">
        <MainBanner slides={MAIN_BANNER_SLIDES} />
        <ReleaseStrip items={RELEASE_ITEMS} />
      </div>

      <ProductShowcase
        title="Most Popular"
        tabs={POPULAR_TABS}
        variant="carousel"
      />

      <SubBannerSection items={SUB_BANNER_ITEMS} />

      <ProductShowcase title="Product" tabs={PRODUCT_TABS} variant="list" />
    </div>
  );
}
