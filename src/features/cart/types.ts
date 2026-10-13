/** 장바구니 타입 — Figma 최종화면 / 장바구니(상품있음)_PC (node 277:7571) */

export type CartLine = {
  id: string;
  imageSrc: string;
  name: string;
  option: string;
  /** 정가(원 단위 정수). 할인이 없으면 비운다 */
  originalPrice?: number;
  /** 판매가 (원 단위 정수) */
  price: number;
  quantity: number;
};

export type CartTab = "domestic" | "overseas";
