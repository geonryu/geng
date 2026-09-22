import type {
  MainBannerSlide,
  ReleaseItem,
  SubBannerItem,
} from "@/features/content/types";
import type { ShowcaseTab } from "@/features/products/types";

/**
 * 메인 화면 목업 데이터 — Figma 젠지온라인리뉴얼 / 최종화면 / 메인_PC (node 277:5039)
 * 실제 데이터는 Phase 1에서 채널 read-model과 진열 규칙이 붙으면 대체된다.
 * 여기 값은 시안 텍스트를 그대로 옮긴 것이다.
 */

/** main_banner — node 277:5085 */
export const MAIN_BANNER_SLIDES: MainBannerSlide[] = [
  {
    id: "uniform",
    titleLines: ["2026 2nd Official", "Player Uniform"],
    subtitle: "SHOW YOUR LIGHT",
    href: "/products/2026-2nd-official-player-uniform",
    imageSrc: "/assets/images/main/banner/slide-01-uniform.png",
    imageAlt: "2026 2nd Official Player Uniform을 입은 선수들",
  },
  {
    id: "genbong",
    titleLines: ["GenBong"],
    subtitle: "승리의 현장을 직접 밝혀주세요",
    href: "/products/genbong",
    imageSrc: "/assets/images/main/banner/slide-02-genbong.png",
    imageAlt: "응원봉 GenBong",
  },
  {
    id: "muffler",
    titleLines: ["Gen.G 2026 Muffler #1"],
    subtitle: "NOW AVAILABLE",
    href: "/products/2026-muffler-1",
    imageSrc: "/assets/images/main/banner/slide-03-muffler.png",
    imageAlt: "Gen.G 2026 Muffler #1",
  },
  {
    id: "genrang-goods",
    titleLines: ["GenRang merch"],
    subtitle: "마스코트 젠랑이 아이템",
    href: "/genrang",
    imageSrc: "/assets/images/main/banner/slide-04.png",
    imageAlt: "마스코트 젠랑이 굿즈",
  },
];

/** Release — node 277:5118 */
export const RELEASE_ITEMS: ReleaseItem[] = [
  {
    id: "uniform",
    label: "2026 1st Official Uniform",
    title: "키링 증정 이벤트 진행중!",
    href: "/events/uniform-keyring",
    imageSrc: "/assets/images/main/release/uniform.png",
    imageAlt: "2026 1st Official Uniform",
  },
  {
    id: "genrang",
    label: "GenRang merch",
    title: "마스코트 젠랑이 아이템",
    href: "/genrang",
    imageSrc: "/assets/images/main/release/genrang.png",
    imageAlt: "마스코트 젠랑이 아이템",
  },
  {
    id: "musinsa",
    label: "✨ Fresh Drop! with MUSINSA",
    title: "무신사 콜라보 제품 판매중!",
    href: "/collabs/musinsa",
    imageSrc: "/assets/images/main/release/musinsa.png",
    imageAlt: "무신사 콜라보 제품",
  },
  {
    id: "membership",
    label: "2026 Membership",
    title: "멤버십 구경하러 가기",
    href: "/membership",
    imageSrc: "/assets/images/main/release/membership.png",
    imageAlt: "2026 Membership",
  },
];

/** 서브 배너 — node 277:5199 / 277:5217 */
const GENRANG_PICKS = [
  {
    id: "genrang-mini-bag-keyring",
    imageSrc: "/assets/images/main/subbanner/genrang-minibag.png",
    title: "GenRang Mini Bag Keyring",
    price: "25,000원",
  },
  {
    id: "genrang-cherry-memo-pad",
    imageSrc: "/assets/images/main/subbanner/genrang-memopad.png",
    title: "GenRang Cherry blossom Memo Pad",
    price: "8,000원",
  },
];

export const SUB_BANNER_ITEMS: SubBannerItem[] = [
  {
    id: "genrang",
    href: "/genrang",
    imageSrc: "/assets/images/main/subbanner/genrang.png",
    imageAlt: "GO TO GenRang — 젠랑이의 귀여움 놓치지 마세요",
    products: GENRANG_PICKS,
  },
  {
    id: "slogan",
    href: "/slogan",
    imageSrc: "/assets/images/main/subbanner/slogan.png",
    imageAlt: "GEN.G’S SLOGAN — 젠지의 슬로건",
    products: GENRANG_PICKS.map((product) => ({
      ...product,
      id: `slogan-${product.id}`,
    })),
  },
];

/** Most Popular — node 277:5147 */
const POPULAR_PRODUCTS = [
  {
    id: "player-jacket",
    title: "2026 2nd Official Player Jacket",
    price: "189,000원",
    href: "/products/player-jacket",
    imageSrc: "/assets/images/main/popular/jacket.png",
    imageAlt: "2026 2nd Official Player Jacket",
  },
  {
    id: "player-jersey",
    title: "2026 2nd Official Player Jersey",
    price: "99,000원",
    href: "/products/player-jersey",
    imageSrc: "/assets/images/main/popular/jersey.png",
    imageAlt: "2026 2nd Official Player Jersey",
  },
  {
    id: "marking-lol",
    title: "2026 2nd Official Player Self Marking Kit (LOL)",
    price: "27,000원",
    href: "/products/marking-kit-lol",
    imageSrc: "/assets/images/main/popular/marking-lol.png",
    imageAlt: "2026 2nd Official Player Self Marking Kit (LOL)",
    titleLines: 2 as const,
  },
  {
    id: "marking-val",
    title: "2026 2nd Official Player Self Marking Kit (VAL)",
    price: "27,000원",
    href: "/products/marking-kit-val",
    imageSrc: "/assets/images/main/popular/marking-val.png",
    imageAlt: "2026 2nd Official Player Self Marking Kit (VAL)",
    titleLines: 2 as const,
  },
  {
    id: "jersey-black",
    title: "2026 1st Official Player Jersey (Black)",
    price: "99,000원",
    href: "/products/jersey-black",
    imageSrc: "/assets/images/main/popular/jersey-black.png",
    imageAlt: "2026 1st Official Player Jersey (Black)",
    titleLines: 2 as const,
  },
];

export const POPULAR_TABS: ShowcaseTab[] = [
  { id: "pro-kit", label: "2026 PRO KIT", products: POPULAR_PRODUCTS },
  { id: "cheering", label: "CHEERING GEAR", products: POPULAR_PRODUCTS },
  { id: "genrang", label: "GENRANG", products: POPULAR_PRODUCTS },
  { id: "collectibles", label: "COLLECTIBLES", products: POPULAR_PRODUCTS },
];

/** Product — node 277:5235 (5칸 × 2줄) */
const PRODUCT_GRID = [
  {
    id: "keycap-keyring",
    title: "[GenRang x Kumdori] Keycap Keyring(Character)",
    price: "15,000원",
    href: "/products/keycap-keyring",
    imageSrc: "/assets/images/main/product/keycap-keyring.png",
    imageAlt: "[GenRang x Kumdori] Keycap Keyring",
    titleLines: 2 as const,
  },
  {
    id: "libilly-tshirt",
    title: "2024 Gen.G x LIBILLY GenRang Flag T-Shirt",
    price: "34,300원",
    href: "/products/libilly-tshirt",
    imageSrc: "/assets/images/main/product/libilly-tshirt.png",
    imageAlt: "2024 Gen.G x LIBILLY GenRang Flag T-Shirt",
    titleLines: 2 as const,
    sale: { rate: "30%", originalPrice: "49,000원" },
  },
  {
    id: "genrang-cushion",
    title: "GenRang Cushion",
    price: "15,000원",
    href: "/products/genrang-cushion",
    imageSrc: "/assets/images/main/product/genrang-cushion.png",
    imageAlt: "GenRang Cushion",
    sale: { rate: "40%", originalPrice: "25,000원" },
  },
  {
    id: "ruler-keyring",
    title: "Ruler 10th Anniversary Metal Keyring",
    price: "25,000원",
    href: "/products/ruler-keyring",
    imageSrc: "/assets/images/main/product/ruler-keyring.png",
    imageAlt: "Ruler 10th Anniversary Metal Keyring",
    titleLines: 2 as const,
  },
  {
    id: "basic-socks",
    title: "GEN.G BASIC SOCKS BLACK",
    price: "5,000원",
    href: "/products/basic-socks",
    imageSrc: "/assets/images/main/product/basic-socks.png",
    imageAlt: "GEN.G BASIC SOCKS BLACK",
  },
  {
    id: "nordvpn-marking-kit",
    title: "2026 Gen.G Self Marking Kit (NordVPN)",
    price: "5,000원",
    href: "/products/nordvpn-marking-kit",
    imageSrc: "/assets/images/main/product/nordvpn-marking-kit.png",
    imageAlt: "2026 Gen.G Self Marking Kit (NordVPN)",
    titleLines: 2 as const,
  },
  {
    id: "lck-cup-keyring",
    title: "2026 LCK CUP Champions Metal Keyring",
    price: "22,000원",
    href: "/products/lck-cup-keyring",
    imageSrc: "/assets/images/main/product/lck-cup-keyring.png",
    imageAlt: "2026 LCK CUP Champions Metal Keyring",
    titleLines: 2 as const,
  },
  {
    id: "genrang-doll-mancity",
    title: "GenRang Doll Keyring(ManCity ver.)",
    price: "30,000원",
    href: "/products/genrang-doll-mancity",
    imageSrc: "/assets/images/main/product/genrang-doll-mancity.png",
    imageAlt: "GenRang Doll Keyring (ManCity ver.)",
    titleLines: 2 as const,
  },
  {
    id: "ruler-tshirt",
    title: "Ruler 10th Anniversary T-Shirt",
    price: "35,000원",
    href: "/products/ruler-tshirt",
    imageSrc: "/assets/images/main/product/ruler-tshirt.png",
    imageAlt: "Ruler 10th Anniversary T-Shirt",
  },
  {
    id: "ruler-acrylic-stand",
    title: "Ruler 10th Anniversary Acrylic Stand",
    price: "20,000원",
    href: "/products/ruler-acrylic-stand",
    imageSrc: "/assets/images/main/product/ruler-acrylic-stand.png",
    imageAlt: "Ruler 10th Anniversary Acrylic Stand",
    titleLines: 2 as const,
  },
];

export const PRODUCT_TABS: ShowcaseTab[] = [
  { id: "best", label: "BEST", products: PRODUCT_GRID },
  { id: "md-pick", label: "MD’s PICK", products: PRODUCT_GRID },
  { id: "new", label: "NEW", products: PRODUCT_GRID },
];
