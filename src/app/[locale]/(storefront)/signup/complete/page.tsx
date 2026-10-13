import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CheckMarkIcon } from "@/components/ui/icons";
import { buttonClass } from "@/components/ui/button";
import { LocaleLink } from "@/components/ui/locale-link";
import { Logo } from "@/components/ui/logo";
import { localePath } from "@/i18n/server";
import { getCurrentMember } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "회원 가입 완료 | Gen.G Online Store",
};

/** 회원가입 완료 — Figma 최종화면 / 회원가입완료_PC (node 277:5909) */
export default async function SignupCompletePage() {
  // 가입 직후 세션으로 본인 정보를 읽는다. 세션이 없으면(직접 URL 진입 등)
  // 보여줄 게 없으므로 로그인으로 보낸다.
  const member = await getCurrentMember();
  if (!member) redirect(await localePath("/login"));

  const memberId = member.loginId;
  const email = member.email;

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
              <p className="text-[14px] text-muted">
                <span className="text-ink">{email}</span>
                <br />
                위 주소로 주문·배송 안내를 보내드립니다.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <p className="flex h-[41px] w-full items-center justify-center gap-1 rounded-pill bg-surface-soft px-4 text-center text-[14px] text-ink">
              <span aria-hidden="true" className="text-[13px]">
                ∙
              </span>
              지금 바로 쇼핑을 시작하실 수 있습니다.
            </p>
            <div className="flex gap-2">
              <LocaleLink
                href="/"
                className={buttonClass({ tone: "outline-strong", size: "md" })}
              >
                쇼핑하러 가기
              </LocaleLink>
              <LocaleLink
                href="/mypage"
                className={buttonClass({ tone: "solid", size: "md" })}
              >
                마이페이지로 가기
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
