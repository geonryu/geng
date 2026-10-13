import { SideNav } from "@/components/ui/side-nav";
import type { Member, MemberSummary } from "@/features/account/queries";
import { SIDE_NAV_GROUPS } from "@/features/account/mypage-data";
import { formatWon } from "@/lib/utils/price";

/**
 * 마이페이지 골격 — node 277:6331
 * 좌측 250px 메뉴(쇼핑정보 요약 카드 포함) + 우측 868px 본문 2단.
 *
 * 회원 정보를 모듈 상수로 직접 import 하던 것을 props 주입으로 바꿨다 —
 * 그래야 로그인한 사람마다 다른 값이 나온다.
 */
export function MyPageShell({
  member,
  summary,
  activeHref,
  children,
}: {
  member: Member;
  summary: MemberSummary;
  activeHref?: string;
  children: React.ReactNode;
}) {
  const summaryRows = [
    { label: "총 주문액", value: `${formatWon(summary.totalOrderAmount)}원` },
    { label: "총주문", value: `${summary.orderCount}회` },
    { label: "적립금", value: `${formatWon(summary.points)}원` },
    { label: "예치금", value: `${formatWon(summary.deposit)}원` },
    { label: "쿠폰", value: `${summary.coupons}장` },
    { label: "찜한 상품", value: `${summary.wishlistCount}개` },
  ];

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-[22px]">
      <div className="lg:w-[250px] lg:shrink-0">
        <SideNav groups={SIDE_NAV_GROUPS} activeHref={activeHref}>
          {/* 쇼핑정보 요약 — node 277:6385 */}
          <div className="flex flex-col gap-6 rounded-field bg-surface-soft px-5 py-6">
            <p className="text-center text-[16px] text-ink">
              <span className="font-bold">{member.name}</span>님의 쇼핑정보
            </p>
            <dl className="flex flex-col gap-4 text-[14px] text-ink">
              {summaryRows.map((row) => (
                <div key={row.label} className="flex justify-between">
                  <dt>{row.label}</dt>
                  <dd className="text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </SideNav>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">{children}</div>
    </div>
  );
}
