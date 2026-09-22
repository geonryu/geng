/** 장바구니 타입 — Figma 최종화면 / 장바구니(상품있음)_PC (node 277:7571) */

export type CartLine = {
  id: string;
  imageSrc: string;
  name: string;
  option: string;
  /** 정가. 할인이 없으면 비운다 */
  originalPrice?: string;
  price: string;
  quantity: number;
};

export type CartTab = "domestic" | "overseas";
