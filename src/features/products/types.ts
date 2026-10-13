import type { ProductSale } from "@/components/ui/product-card";

/** REQ003-05 자동 전시 — 메인 화면 상품 진열 슬롯 타입. */
export type ShowcaseProduct = {
  id: string;
  title: string;
  /** 판매가 (원 단위 정수) */
  price: number;
  href: string;
  imageSrc: string;
  imageAlt: string;
  /** 시안의 PRODUCT variant(1line / 2line)에 대응한다. */
  titleLines?: 1 | 2;
  sale?: ProductSale;
};

/** TAP_ver1 한 칸 + 그 탭에 진열되는 상품들. */
export type ShowcaseTab = {
  id: string;
  label: string;
  products: ShowcaseProduct[];
};
