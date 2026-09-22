import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SignupForm } from "@/features/account/components/signup-form";

export const metadata: Metadata = {
  title: "회원가입 | Gen.G Online Store",
};

/** 회원가입 — Figma 최종화면 / 회원가입시안1_PC (node 277:7805), 회원가입_MO (node 290:15888) */
export default function SignupPage() {
  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "회원가입" }]} />
      <SignupForm />
    </Container>
  );
}
