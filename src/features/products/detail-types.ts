/**
 * 상품상세 타입 — Figma 최종화면 / 상품상세시안1_PC (node 277:5284 외), 상품상세_MO (node 290:13438)
 * 시안 5종은 한 페이지의 탭·옵션 상태 변형이라 하나의 모델로 합쳤다.
 */

export type ProductOption = {
  id: string;
  label: string;
  /** 옵션별 추가금이 없으면 상품가를 그대로 쓴다 (원 단위 정수) */
  price: number;
};

/** 상품설명 탭의 스펙 표 — node 290:14795 */
export type ProductSpec = {
  label: string;
  value: string;
};

/** 상품후기 — node 277:5753 */
export type ProductReview = {
  id: string;
  author: string;
  date: string;
  option: string;
  title: string;
  body: string;
  imageSrc?: string;
};

/** Q&A — node 277:8379 */
export type ProductQuestion = {
  id: string;
  status: "답변대기" | "답변완료";
  /** 비밀글이면 본문 대신 자물쇠 문구가 나온다 (node 277:8387) */
  secret?: boolean;
  title: string;
  author: string;
  date: string;
  answer?: {
    body: string[];
    date: string;
  };
};

export type ProductDetail = {
  slug: string;
  name: string;
  /** 판매가 (원 단위 정수) */
  price: number;
  shippingNotice: string;
  breadcrumb: { label: string; href?: string }[];
  gallery: { id: string; src: string; alt: string }[];
  options: ProductOption[];
  /** 상세 설명 헤드카피 — node 290:14780 */
  detailHeading: string[];
  specs: ProductSpec[];
  highlights: string[];
  detailImageSrc: string;
  reviews: ProductReview[];
  questions: ProductQuestion[];
  guides: { id: string; label: string; content: string }[];
};
