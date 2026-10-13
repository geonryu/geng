import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CartView } from "@/features/cart/components/cart-view";
import type { CartLine } from "@/features/cart/types";

export const metadata: Metadata = {
  title: "장바구니 | Gen.G Online Store",
};

/**
 * 장바구니 — Figma 최종화면 / 장바구니(상품있음)_PC (node 277:7571),
 * 장바구니(상품없음)_PC (node 277:6229), 장바구니_MO (node 290:16423)
 *
 * 시안의 목업 담긴 상품. Phase 1에서 채널 장바구니와 연결되면 대체된다.
 * `?empty=1`로 빈 장바구니 상태를 확인할 수 있다.
 */
const CART_LINES: CartLine[] = [
  {
    id: "player-keycap-keyring",
    imageSrc: "/assets/images/main/product/keycap-keyring.png",
    name: "Player Keycap Keyring",
    option: "CHOVY",
    originalPrice: 18000,
    price: 16200,
    quantity: 1,
  },
];

export default async function CartPage(props: PageProps<"/[locale]/cart">) {
  const search = await props.searchParams;
  const empty = search.empty === "1";

  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "장바구니" }]} />
      <CartView initialLines={empty ? [] : CART_LINES} />
    </Container>
  );
}
