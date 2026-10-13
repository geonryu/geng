import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { NoticeBox } from "@/components/ui/notice-box";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { WithdrawForm } from "@/features/account/components/withdraw-form";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "회원탈퇴 | Gen.G Online Store",
};

/**
 * 회원탈퇴 — **Figma 시안 없음**.
 * 되돌릴 수 없는 동작이라 안내(NoticeBox) → 아이디 직접 입력 확인 → 실행 순서로 둔다.
 */
export default async function MyPageWithdrawPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login?next=/mypage/withdraw");

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "회원탈퇴" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/withdraw">
        <h2 className="text-[16px] font-bold text-ink">회원탈퇴</h2>

        <NoticeBox
          title="탈퇴 전 확인해주세요"
          items={[
            "탈퇴하면 회원정보·배송주소록·찜한 상품이 삭제되며 되돌릴 수 없습니다.",
            "이미 접수된 주문의 처리와 환불은 해당 채널의 정책에 따라 계속 진행됩니다.",
            "보유하신 적립금과 쿠폰은 탈퇴와 함께 소멸됩니다.",
          ]}
        />

        <WithdrawForm loginId={member.loginId} />
      </MyPageShell>
    </>
  );
}
