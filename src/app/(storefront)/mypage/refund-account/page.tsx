import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { NoticeBox } from "@/components/ui/notice-box";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "환불계좌관리 | Gen.G Online Store",
};

/**
 * 환불계좌관리 — **Figma 시안 없음**, 그리고 **의도적으로 입력 폼을 두지 않는다**.
 *
 * 환불 금전 처리는 원본 채널/PG 가 소유하고 Phase 2 다 (AGENTS.md §1 절대 규칙).
 * 환불 계좌를 내 DB 에 받아 두면 정산 주체가 둘이 되므로 테이블도 만들지 않았다.
 * 지금은 어디서 등록해야 하는지 안내만 한다.
 */
export default async function MyPageRefundAccountPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login?next=/mypage/refund-account");

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "환불계좌관리" },
        ]}
      />

      <MyPageShell
        member={member}
        summary={summary}
        activeHref="/mypage/refund-account"
      >
        <h2 className="text-[16px] font-bold text-ink">환불계좌관리</h2>

        <EmptyState
          message="등록된 환불 계좌가 없습니다."
          action={{ label: "주문/배송내역 보기", href: "/mypage/orders" }}
        />

        <NoticeBox
          title="환불 계좌 안내"
          items={[
            "환불 계좌는 상품을 구매한 채널에 등록됩니다.",
            "환불 금액은 결제하신 수단으로 되돌려 드리며, 계좌 환불은 해당 채널의 정책을 따릅니다.",
            "계좌 정보는 이 사이트에 저장되지 않습니다.",
          ]}
        />
      </MyPageShell>
    </>
  );
}
