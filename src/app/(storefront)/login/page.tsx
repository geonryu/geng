import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LoginForm } from "@/features/account/components/login-form";

export const metadata: Metadata = {
  title: "로그인 | Gen.G Online Store",
};

/**
 * 로그인 — Figma 최종화면 / 로그인시안2_PC (node 277:6028 외 3종), 로그인_MO (node 290:15345 외)
 * 시안 4종은 회원/비회원 탭 × 입력 상태 변형이라 한 폼으로 합쳤다.
 * `?from=cart`로 들어오면 비회원 주문 진입점이 붙는다 (node 277:6126).
 */
export default async function LoginPage(props: PageProps<"/login">) {
  const search = await props.searchParams;
  const fromCart = search.from === "cart";

  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "로그인" }]} />
      <LoginForm showGuestOrder={fromCart} />
    </Container>
  );
}
