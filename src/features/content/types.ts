/** REQ002-01 배너/테마 — 메인 화면 콘텐츠 슬롯 타입. */

/** main_banner — node 148:1560 */
export type MainBannerSlide = {
  id: string;
  /** 시안은 2줄 타이틀이다. 줄바꿈 위치를 운영자가 정하도록 배열로 받는다. */
  titleLines: string[];
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

/** Release — node 148:1802 (RELEASE_ver1 카드 4개) */
export type ReleaseItem = {
  id: string;
  label: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

/** sub_banner — node 148:2456 (SUB_BANNER_ver1 카드 2개) */
export type SubBannerItem = {
  id: string;
  title: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};
