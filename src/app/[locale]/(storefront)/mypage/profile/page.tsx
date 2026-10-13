import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { NoticeBox } from "@/components/ui/notice-box";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { ProfileForm } from "@/features/account/components/profile-form";
import { loginPath } from "@/i18n/server";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "회원정보 수정 | Gen.G Online Store",
};

/**
 * 회원정보 수정 — **Figma 시안 없음**.
 * 회원가입 폼(node 277:7856)의 입력 구성을 그대로 재사용한다.
 */
export default async function MyPageProfilePage() {
  const member = await getCurrentMember();
  if (!member) redirect(await loginPath("/mypage/profile"));

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "회원정보 수정" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/profile">
        <h2 className="text-[16px] font-bold text-ink">회원정보 수정</h2>
        <ProfileForm member={member} />
        <NoticeBox
          title="안내"
          items={[
            "아이디와 이메일은 계정 식별에 쓰여 변경할 수 없습니다.",
            "비밀번호 변경은 로그인 화면의 비밀번호 찾기를 이용해주세요.",
          ]}
        />
      </MyPageShell>
    </>
  );
}
