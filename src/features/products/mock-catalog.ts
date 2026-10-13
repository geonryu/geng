import {
  POPULAR_PRODUCTS,
  PRODUCT_GRID,
} from "@/app/[locale]/(storefront)/main-page-data";
import type { ProductCategory, ProductSummary } from "@/features/products/queries";

/**
 * 프로토타입용 상품 카탈로그.
 *
 * DB 가 아직 연결되지 않았거나 products 테이블이 비어 있을 때, 진열 화면이
 * 빈 상태로만 보이지 않도록 메인 화면의 목업 상품을 그대로 재사용한다.
 * 메인과 같은 데이터를 쓰므로 카드 이미지·가격이 서로 어긋나지 않는다.
 *
 * **DB 에 상품이 들어오면 이 폴백은 쓰이지 않는다.** 시드가 자리잡으면 제거한다.
 */

/** 목업에는 분류 정보가 없어 상품 id 로 수동 매핑한다. */
const CATEGORY_BY_ID: Record<string, ProductCategory> = {
  "player-jacket": "pro",
  "player-jersey": "pro",
  "marking-lol": "pro",
  "marking-val": "pro",
  "jersey-black": "pro",
  "nordvpn-marking-kit": "pro",
  "keycap-keyring": "genrang",
  "libilly-tshirt": "genrang",
  "genrang-cushion": "genrang",
  "genrang-doll-mancity": "genrang",
  "ruler-keyring": "goods",
  "basic-socks": "goods",
  "lck-cup-keyring": "goods",
  "ruler-tshirt": "goods",
  "ruler-acrylic-stand": "goods",
};

type ShowcaseLike = {
  id: string;
  title: string;
  price: number;
  href: string;
  imageSrc: string;
  sale?: { originalPrice: number };
};

function toSummary(item: ShowcaseLike): ProductSummary & {
  category: ProductCategory | null;
} {
  return {
    id: item.id,
    // href 가 `/products/<slug>` 형태라 마지막 조각이 slug 다.
    slug: item.href.replace(/^\/products\//, ""),
    name: item.title,
    price: item.price,
    originalPrice: item.sale?.originalPrice ?? null,
    thumbnailSrc: item.imageSrc,
    category: CATEGORY_BY_ID[item.id] ?? null,
  };
}

/** 메인의 인기상품 + 상품 그리드를 합친 카탈로그. id 중복은 앞의 것을 남긴다. */
export const MOCK_CATALOG = [...POPULAR_PRODUCTS, ...PRODUCT_GRID]
  .map(toSummary)
  .filter(
    (item, index, all) => all.findIndex((x) => x.id === item.id) === index,
  );
