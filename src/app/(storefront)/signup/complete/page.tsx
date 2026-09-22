import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CheckMarkIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

export const metadata: Metadata = {
  title: "회원 가입 완료 | Gen.G Online Store",
};

/** 회원가입 완료 — Figma 최종화면 / 회원가입완료_PC (node 277:5909) */
export default function SignupCompletePage() {
  const memberId = "kimgenrang";
  const email = "kimgenrang@gmail.com";

  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb
        items={[{ label: "홈", href: "/" }, { label: "회원 가입 완료" }]}
      />

      <div className="mx-auto flex w-full max-w-[550px] flex-col items-center gap-[50px]">
        <p className="flex items-center gap-1 text-[14px] font-bold text-ink">
          Gen.G Online Store
          <Logo className="size-4" />
        </p>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-[253px] flex-col items-center gap-6">
            <span className="flex size-[45px] items-center justify-center rounded-full bg-ink text-white">
              <CheckMarkIcon className="size-7" />
            </span>

            <h1 className="text-center text-[24px] font-bold text-ink">
              회원가입 완료
            </h1>

            <div className="flex flex-col items-center gap-3 text-center text-[16px] text-ink">
              <p>
                {memberId}님(아이디)의 회원가입이
                <br />
                성공적으로 완료되었습니다.
              </p>
              <p>
                <span className="text-sale">{email}</span>으로
                <br />
                인증 메일이 발송되었습니다.
              </p>
            </div>
          </div>

          <p className="flex h-[41px] w-full items-center justify-center gap-1 rounded-pill bg-surface-soft px-4 text-center text-[14px] text-ink">
            <span aria-hidden="true" className="text-[13px]">
              ∙
            </span>
            이메일 주소로 발송된 인증 메일을 통해 인증하신 후에 로그인이
            가능합니다.
          </p>
        </div>
      </div>
    </Container>
  );
}
