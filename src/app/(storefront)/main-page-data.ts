import type {
  MainBannerSlide,
  ReleaseItem,
  SubBannerItem,
} from "@/features/content/types";
import type { ShowcaseProduct, ShowcaseTab } from "@/features/products/types";

/**
 * 메인시안1_PC(node 150:3232)의 배치 데이터.
 * 지금은 시안 값을 그대로 옮긴 상수이고, Supabase 연동 시 features/*의 queries로 대체한다.
 * 텍스트·이미지는 시안에 있는 것만 사용했고, 시안이 정의하지 않은 부분은 주석으로 표시했다.
 */

export const MAIN_BANNER_SLIDES: MainBannerSlide[] = [
  {
    id: "uniform",
    titleLines: ["2026 2nd Official", "Player Uniform"],
    subtitle: "SHOW YOUR LIGHT",
    href: "/pro",
    imageSrc: "/assets/images/main/slide-uniform.png",
    imageAlt: "2026 2nd 오피셜 플레이어 유니폼을 입은 선수단",
  },
  // 시안은 1번 슬라이드의 카피만 정의한다. 아래 두 장은 뒤에 겹쳐 보이는 이미지라
  // 카피가 없어, 이미지에 맞춘 임시 문구를 넣었다.
  {
    id: "lightstick",
    titleLines: ["Official", "Light Stick"],
    subtitle: "SHOW YOUR LIGHT",
    href: "/shop",
    imageSrc: "/assets/images/main/slide-lightstick.png",
    imageAlt: "젠지 공식 응원봉 두 종",
  },
  {
    id: "genrang-goods",
    titleLines: ["GenRang", "Goods Collection"],
    subtitle: "SHOW YOUR LIGHT",
    href: "/genrang",
    imageSrc: "/assets/images/main/slide-genrang-goods.png",
    imageAlt: "마스코트 젠랑이 키링과 뱃지",
  },
];

export const RELEASE_ITEMS: ReleaseItem[] = [
  {
    id: "1st-uniform",
    label: "2026 1st Official Uniform",
    title: "키링 증정 이벤트 진행중!",
    href: "/pro",
    imageSrc: "/assets/images/main/release-1st-uniform.png",
    imageAlt: "2026 1st 오피셜 유니폼",
  },
  {
    id: "genrang-merch",
    label: "GenRang merch",
    title: "마스코트 젠랑이 아이템",
    href: "/genrang",
    imageSrc: "/assets/images/main/release-genrang.png",
    imageAlt: "젠랑이 굿즈",
  },
  {
    id: "musinsa",
    label: "✨ Fresh Drop! with MUSINSA",
    title: "무신사 콜라보 제품 판매중!",
    href: "/shop",
    imageSrc: "/assets/images/main/release-musinsa.png",
    imageAlt: "무신사 콜라보 후디",
  },
  {
    id: "membership",
    label: "2026 Membership",
    title: "멤버십 구경하러 가기",
    href: "/membership",
    imageSrc: "/assets/images/main/release-membership.png",
    imageAlt: "2026 멤버십",
  },
];

export const SUB_BANNER_ITEMS: SubBannerItem[] = [
  {
    id: "genrang",
    title: "GO TO GenRang",
    href: "/genrang",
    imageSrc: "/assets/images/main/subbanner-genrang.png",
    imageAlt: "GO TO GenRang 기획전",
  },
  {
    id: "slogan",
    title: "GEN.G’S SLOGAN",
    href: "/about",
    imageSrc: "/assets/images/main/subbanner-slogan.png",
    imageAlt: "젠지 슬로건 기획전",
  },
];

const POPULAR_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "player-jacket",
    title: "2026 2nd Official Player Jacket",
    price: "189,000원",
    href: "/product/player-jacket",
    imageSrc: "/assets/images/main/jacket-cream.png",
    imageAlt: "2026 2nd 오피셜 플레이어 자켓",
  },
  {
    id: "player-jersey",
    title: "2026 2nd Official Player Jersey",
    price: "99,000원",
    href: "/product/player-jersey",
    imageSrc: "/assets/images/main/jersey-cream.png",
    imageAlt: "2026 2nd 오피셜 플레이어 저지",
  },
  {
    id: "marking-kit-lol",
    title: "2026 2nd Official Player Self Marking Kit (LOL)",
    price: "27,000원",
    href: "/product/marking-kit-lol",
    imageSrc: "/assets/images/main/marking-kit-lol.png",
    imageAlt: "LOL 셀프 마킹 키트",
    titleLines: 2,
  },
  {
    id: "marking-kit-val",
    title: "2026 2nd Official Player Self Marking Kit (VAL)",
    price: "27,000원",
    href: "/product/marking-kit-val",
    imageSrc: "/assets/images/main/marking-kit-val.png",
    imageAlt: "VALORANT 셀프 마킹 키트",
    titleLines: 2,
  },
];

const PRODUCT_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "best-jacket",
    title: "2026 2nd Official Player Jacket",
    price: "99,000원",
    href: "/product/player-jacket",
    imageSrc: "/assets/images/main/jersey-cream.png",
    imageAlt: "2026 2nd 오피셜 플레이어 자켓",
  },
  {
    id: "best-jersey",
    title: "2026 2nd Official Player Jersey",
    price: "27,900원",
    href: "/product/player-jersey",
    imageSrc: "/assets/images/main/phone-case.png",
    imageAlt: "2026 2nd 오피셜 플레이어 저지",
  },
  {
    id: "best-marking-kit-lol",
    title: "2026 2nd Official Player Self Marking Kit (LOL)",
    price: "27,000원",
    href: "/product/marking-kit-lol",
    imageSrc: "/assets/images/main/marking-kit-lol.png",
    imageAlt: "LOL 셀프 마킹 키트",
    titleLines: 2,
  },
  {
    id: "best-marking-kit-val",
    title: "2026 2nd Official Player Self Marking Kit (VAL)",
    price: "27,000원",
    href: "/product/marking-kit-val",
    imageSrc: "/assets/images/main/marking-kit-val.png",
    imageAlt: "VALORANT 셀프 마킹 키트",
    titleLines: 2,
  },
];

/** 시안에는 탭별 상품 목록이 없다. 연동 전까지는 모든 탭이 같은 목록을 보여준다. */
export const POPULAR_TABS: ShowcaseTab[] = [
  { id: "pro-kit", label: "2026 PRO KIT", products: POPULAR_PRODUCTS },
  {
    id: "cheering-gear",
    label: "CHEERING GEAR",
    products: POPULAR_PRODUCTS,
  },
  { id: "genrang", label: "GENRANG", products: POPULAR_PRODUCTS },
  {
    id: "collectibles",
    label: "COLLECTIBLES",
    products: POPULAR_PRODUCTS,
  },
];

export const PRODUCT_TABS: ShowcaseTab[] = [
  { id: "best", label: "BEST", products: PRODUCT_PRODUCTS },
  { id: "mds-pick", label: "MD's PICK", products: PRODUCT_PRODUCTS },
  { id: "new", label: "NEW", products: PRODUCT_PRODUCTS },
];
