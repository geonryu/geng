import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ChevronRightIcon } from "@/components/ui/icons";
import { InfoStrip } from "@/components/ui/info-strip";
import { StatCard } from "@/components/ui/stat-card";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { ORDER_STATUS, THUMBNAILS } from "@/features/account/mypage-data";
import { loginPath } from "@/i18n/server";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";
import { formatWon } from "@/lib/utils/price";

export const metadata: Metadata = {
  title: "마이페이지 | Gen.G Online Store",
};

/** 마이페이지 — Figma 최종화면 / 마이페이지_PC (node 277:6331) */
export default async function MyPage() {
  // proxy 가 먼저 걸러내지만 그건 낙관적 검사일 뿐이다. 실제 판단은 여기서 한다.
  const member = await getCurrentMember();
  if (!member) redirect(await loginPath("/mypage"));

  const summary = await getMemberSummary(member.id);

  return (
    <>
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "마이페이지" }]} />

      <MyPageShell member={member} summary={summary} activeHref="/mypage">
        {/* 요약 카드 — node 277:6449 */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            iconSrc="/assets/icons/stat-orders.svg"
            title="총주문"
            values={[
              { amount: formatWon(summary.totalOrderAmount), unit: "원" },
              { amount: String(summary.orderCount), unit: "회" },
            ]}
          />
          <StatCard
            iconSrc="/assets/icons/stat-coupon.svg"
            title="쿠폰"
            values={[{ amount: String(summary.coupons), unit: "장" }]}
          />
          <StatCard
            iconSrc="/assets/icons/stat-points.svg"
            title="총적립금"
            values={[{ amount: formatWon(summary.points), unit: "원" }]}
          />
        </div>

        <InfoStrip
          cells={[
            { label: "가용적립금", value: `${formatWon(summary.points)}원` },
            { label: "사용적립금", value: "0원" },
            { label: "예치금", value: `${formatWon(summary.deposit)}원` },
          ]}
        />

        {/* 주문 상태 — node 277:6511. 첫 칸만 제목/부연 형태다. */}
        <div className="flex w-full items-stretch overflow-x-auto rounded-field border border-line bg-white">
          <div className="flex h-[98px] w-[162px] shrink-0 flex-col justify-center gap-2 pl-5">
            <p className="text-[16px] font-bold text-ink">주문내역</p>
            <p className="text-[13px] text-muted">(최근 3개월 기준)</p>
          </div>
          {ORDER_STATUS.map((status) => (
            <div
              key={status.label}
              className="flex h-[98px] min-w-[117px] flex-1 flex-col justify-center gap-2 border-l border-line pl-5"
            >
              <p className="text-[16px] font-bold text-ink">{status.value}</p>
              <p className="text-[14px] text-muted">{status.label}</p>
            </div>
          ))}
        </div>

        <ThumbnailSection title="찜한 상품" href="/mypage/wishlist" />
        <ThumbnailSection title="최근 본 상품" href="/mypage/recent" />
      </MyPageShell>
    </>
  );
}

/** 찜한 상품 · 최근 본 상품 — node 277:6565 / 277:6584 */
function ThumbnailSection({ title, href }: { title: string; href: string }) {
  return (
    <section className="flex flex-col gap-5 pt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-ink">{title}</h2>
        <LocaleLink
          href={href}
          className="flex items-center gap-1 text-[14px] text-muted hover:text-ink"
        >
          더보기
          <ChevronRightIcon />
        </LocaleLink>
      </div>

      <ul className="flex gap-[23px] overflow-x-auto">
        {THUMBNAILS.map((thumbnail) => (
          <li key={thumbnail.id} className="relative size-[76px] shrink-0">
            <Image
              src={thumbnail.src}
              alt=""
              fill
              sizes="76px"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
