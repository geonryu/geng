import type { SideNavGroup } from "@/components/ui/side-nav";

/** 마이페이지 목업 — Figma 최종화면 / 마이페이지_PC (node 277:6331 외) */

export const MEMBER = {
  name: "김젠랑",
  totalOrderAmount: "3,202,600원",
  orderCount: "32회",
  points: "30,600원",
  deposit: "0원",
  coupons: "0장",
  wishlist: "10개",
};

export const SIDE_NAV_GROUPS: SideNavGroup[] = [
  {
    id: "personal",
    title: "개인정보",
    items: [
      { label: "회원정보 수정", href: "/mypage/profile" },
      { label: "환불계좌관리", href: "/mypage/refund-account" },
      { label: "배송주소록 관리", href: "/mypage/addresses" },
      { label: "회원탈퇴", href: "/mypage/withdraw" },
    ],
  },
  {
    id: "shopping",
    title: "쇼핑정보",
    items: [
      { label: "주문/배송내역", href: "/mypage/orders" },
      { label: "취소/반품/교환 내역", href: "/mypage/claims" },
      { label: "나의 적립금", href: "/mypage/points" },
      { label: "할인쿠폰", href: "/mypage/coupons" },
      { label: "찜한상품", href: "/mypage/wishlist" },
      { label: "상품후기", href: "/mypage/reviews" },
      { label: "최근 본 상품", href: "/mypage/recent" },
    ],
  },
];

/** 주문 상태 카운트 — node 277:6511 / 277:6752 */
export const ORDER_STATUS = [
  { label: "입금전", value: "0" },
  { label: "배송준비중", value: "2" },
  { label: "배송중", value: "1" },
  { label: "배송완료", value: "15" },
  { label: "취소", value: "0" },
  { label: "교환/반품", value: "0" },
];

/** 최근주문내역 — node 277:6796 */
export const RECENT_ORDERS = [
  { date: "2026.08.13", number: "A2622554176527", name: "주문상품명A 외  2종", amount: "178,000원", status: "배송준비중" },
  { date: "2026.08.11", number: "A2622554176527", name: "주문상품명", amount: "62,000원", status: "배송준비중" },
  { date: "2026.07.30", number: "A2622554176527", name: "주문상품명", amount: "47,000원", status: "배송중" },
  { date: "2026.07.10", number: "A2622554176527", name: "주문상품명", amount: "32,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
  { date: "2026.06.08", number: "A2622554176527", name: "주문상품명", amount: "56,000원", status: "배송완료" },
];

/** 찜한 상품 · 최근 본 상품 — node 277:6574 (76px 썸네일 9칸) */
export const THUMBNAILS = Array.from({ length: 9 }, (_, index) => ({
  id: `thumb-${index}`,
  src: "/assets/images/main/product/keycap-keyring.png",
}));
