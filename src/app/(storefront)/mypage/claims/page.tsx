import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { NoticeBox } from "@/components/ui/notice-box";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "취소/반품/교환 내역 | Gen.G Online Store",
};

/**
 * 취소/반품/교환 내역 — **Figma 시안 없음**.
 * 사이드 메뉴(node 277:6385)에는 있으나 화면 시안이 없어, 같은 마이페이지 하위인
 * 주문/배송내역(node 277:6603)의 뼈대를 그대로 따랐다.
 *
 * 클레임 데이터의 원본은 외부 채널이다(AGENTS.md §1). 통합 주문 read-model 에
 * 클레임 상태가 적재되기 전까지는 빈 상태만 보여준다 — 임의로 만들지 않는다.
 */
export default async function MyPageClaimsPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login?next=/mypage/claims");

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "취소/반품/교환 내역" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/claims">
        <section className="flex flex-col gap-5">
          <h2 className="text-[16px] font-bold text-ink">취소/반품/교환 내역</h2>
          <EmptyState
            message="취소·반품·교환 내역이 없습니다."
            action={{ label: "주문/배송내역 보기", href: "/mypage/orders" }}
          />
        </section>

        <NoticeBox
          title="안내"
          items={[
            "취소·반품·교환 접수는 상품을 구매한 채널에서 진행됩니다.",
            "처리 상태는 채널에서 반영된 뒤 이곳에 표시됩니다.",
          ]}
        />
      </MyPageShell>
    </>
  );
}
