import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";
import { loginPath } from "@/i18n/server";

export const metadata: Metadata = {
  title: "최근 본 상품 | Gen.G Online Store",
};

/**
 * 최근 본 상품 — **Figma 시안 없음**.
 * 마이페이지(node 277:6584)의 76px 썸네일 줄이 "더보기"로 이 화면을 가리킨다.
 *
 * 열람 이력을 담는 테이블이 아직 없다. 서버에 남길지(회원 행동 로그) 브라우저에
 * 남길지(localStorage)가 정해지지 않아 임의로 만들지 않고 빈 상태만 둔다.
 */
export default async function MyPageRecentPage() {
  const member = await getCurrentMember();
  if (!member) redirect(await loginPath("/mypage/recent"));

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "최근 본 상품" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/recent">
        <section className="flex flex-col gap-5">
          <h2 className="text-[16px] font-bold text-ink">최근 본 상품</h2>
          <EmptyState
            message="최근 본 상품이 없습니다."
            action={{ label: "쇼핑하러 가기", href: "/" }}
          />
        </section>
      </MyPageShell>
    </>
  );
}
