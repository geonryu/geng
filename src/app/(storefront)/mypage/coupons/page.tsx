import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { InfoStrip } from "@/components/ui/info-strip";
import { NoticeBox } from "@/components/ui/notice-box";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";

export const metadata: Metadata = {
  title: "할인쿠폰 | Gen.G Online Store",
};

/**
 * 할인쿠폰 — **Figma 시안 없음**.
 * 나의 적립금(node 277:6916)의 "요약 스트립 + 목록" 구성을 그대로 따랐다.
 * 쿠폰 테이블은 아직 없다 — 발급·사용 원장은 결제 영역에 가까워 Phase 2 다.
 */
export default async function MyPageCouponsPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login?next=/mypage/coupons");

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "할인쿠폰" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/coupons">
        <InfoStrip
          cells={[
            { label: "사용 가능 쿠폰", value: `${summary.coupons}장` },
            { label: "사용 완료", value: "0장" },
            { label: "기간 만료", value: "0장" },
          ]}
        />

        <section className="flex flex-col gap-5">
          <h2 className="text-[16px] font-bold text-ink">보유 쿠폰</h2>
          <EmptyState
            message="보유한 쿠폰이 없습니다."
            action={{ label: "쇼핑하러 가기", href: "/" }}
          />
        </section>

        <NoticeBox
          title="쿠폰 이용안내"
          items={[
            "쿠폰은 상품을 구매한 채널의 정책에 따라 적용됩니다.",
            "유효기간이 지난 쿠폰은 자동으로 만료 처리됩니다.",
          ]}
        />
      </MyPageShell>
    </>
  );
}
