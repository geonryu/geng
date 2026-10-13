import type { ProductDetail } from "@/features/products/detail-types";

/**
 * 상품상세 목업 — Figma 최종화면 / 상품상세시안1_PC (node 277:5284 외)
 * 시안 텍스트를 그대로 옮겼다. Phase 1에서 채널 read-model이 붙으면 대체된다.
 */
export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  "2026-2nd-official-player-jacket": {
    slug: "2026-2nd-official-player-jacket",
    name: "2026 2nd Official Player Jacket",
    price: 189000,
    shippingNotice: "3,000원 (70,000원 이상 무료배송)",
    breadcrumb: [
      { label: "홈", href: "/" },
      { label: "Pro Kit", href: "/pro" },
      { label: "2026 Pro Kit" },
    ],
    gallery: [
      { id: "g1", src: "/assets/images/pdp/gallery-01.png", alt: "2026 2nd Official Player Jacket 제품 컷" },
      { id: "g2", src: "/assets/images/pdp/gallery-02.png", alt: "선수 착용 컷 1" },
      { id: "g3", src: "/assets/images/pdp/gallery-03.png", alt: "선수 착용 컷 2" },
      { id: "g4", src: "/assets/images/pdp/gallery-04.png", alt: "선수 착용 컷 3" },
      { id: "g5", src: "/assets/images/pdp/gallery-05.png", alt: "선수 착용 컷 4" },
      { id: "g6", src: "/assets/images/pdp/gallery-06.png", alt: "선수 착용 컷 5" },
    ],
    options: [
      { id: "s", label: "S", price: 189000 },
      { id: "m", label: "M", price: 189000 },
      { id: "l", label: "L", price: 189000 },
      { id: "xl", label: "XL", price: 189000 },
      { id: "2xl", label: "2XL", price: 189000 },
    ],
    detailHeading: ["Gen.G × MUSINSA", "2026 2nd Official Player Jacket"],
    specs: [
      { label: "Style No", value: "MSGGJP2602IV" },
      { label: "Material", value: "Ivory" },
      { label: "Weight", value: "레귤러 핏" },
    ],
    highlights: [
      "무신사와 젠지이스포츠 파트너십으로 선보이는 2026 두 번째 공식 유니폼",
      "젠지의 골드 컬러를 활용한 컬러 블록 디자인",
      "견고한 립 스톱 구조의 나일론 소재와 쟁지 로고 패턴을 더한 메시 안감으로 제작",
      "덕지의 여유 있는 레귤러 핏",
      "곳곳에 장식된 무신사 및 젠지 로고 등이 포인트 선사",
      "스탠드 칼라와 사이드 지퍼 포켓, 소맷단 밴드 등 실용적인 디테일",
      "핏 조절을 돕는 밑단의 스트링 처리",
    ],
    detailImageSrc: "/assets/images/pdp/detail.png",
    reviews: [
      {
        id: "r1",
        author: "류****",
        date: "2026.08.29",
        option: "2XL",
        title: "실물이 더 예뻐요!",
        body: "사진이 유니폼의 실물을 다 못 담아내는거 같아요. 사진으로 봤을 때도 예뻤는데 실제로 보니까 더더 예뻐요! 입었을 때도 전혀 불편함 없이 움직이고 재질도 좋아요.",
        imageSrc: "/assets/images/pdp/review-01.png",
      },
      {
        id: "r2",
        author: "양****",
        date: "2026.07.25",
        option: "M",
        title: "너무 좋아요...",
        body: "사서 오늘 와서 입어봤는데 사진보다 실착이 더 편하고 좋아요...",
      },
    ],
    questions: [
      {
        id: "q1",
        status: "답변대기",
        title: "XL 재입고 언제 되나요?",
        author: "류****",
        date: "2026.08.29",
      },
      {
        id: "q2",
        status: "답변완료",
        secret: true,
        title: "비밀글 입니다.",
        author: "양****",
        date: "2026.07.25",
      },
      {
        id: "q3",
        status: "답변완료",
        title: "XS 사이즈는 없나요?",
        author: "남****",
        date: "2026.07.20",
        answer: {
          body: [
            "안녕하세요, 젠지입니다.",
            "문의주신 해당 상품의 경우 XS 사이즈는 현재 미판매 중입니다.",
            "구매에 참고해주시기 바랍니다.",
            "감사합니다 :)",
          ],
          date: "2026.07.20",
        },
      },
    ],
    guides: [
      {
        id: "purchase",
        label: "구매안내",
        content: "주문 후 결제 확인 시 순차적으로 상품이 준비됩니다.",
      },
      {
        id: "delivery",
        label: "배송안내",
        content: "배송비 3,000원 · 70,000원 이상 구매 시 무료배송입니다.",
      },
      {
        id: "exchange",
        label: "교환/반품/환불 안내",
        content: "상품 수령 후 7일 이내 교환·반품 신청이 가능합니다.",
      },
    ],
  },
};
