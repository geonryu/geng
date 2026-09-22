/** REQ002-01 배너/테마 — 메인 화면 콘텐츠 슬롯 타입. (최종화면 node 277:5039 기준) */

import type { ProductListItem } from "@/components/ui/product-list-row";

/** main_banner — node 277:5085 */
export type MainBannerSlide = {
  id: string;
  /** 시안은 2줄 타이틀이다. 줄바꿈 위치를 운영자가 정하도록 배열로 받는다. */
  titleLines: string[];
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

/** Release — node 277:5118 (가로형 소식 카드 4개) */
export type ReleaseItem = {
  id: string;
  label: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

/**
 * 서브 배너 — node 277:5199 / 277:5217
 * 상단 이미지(문구는 이미지에 포함)와 하단 상품 목록이 한 카드를 이룬다.
 */
export type SubBannerItem = {
  id: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  products: ProductListItem[];
};
