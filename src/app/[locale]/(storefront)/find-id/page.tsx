import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { FindAccountForm } from "@/features/account/components/find-account-form";

export const metadata: Metadata = {
  title: "아이디 찾기 | Gen.G Online Store",
};

/** 아이디 찾기 — **Figma 시안 없음**. 로그인 화면(node 277:6079)의 링크 대상. */
export default function FindIdPage() {
  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb
        items={[{ label: "홈", href: "/" }, { label: "아이디 찾기" }]}
      />
      <FindAccountForm mode="id" />
    </Container>
  );
}
