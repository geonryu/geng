import { SideNav } from "@/components/ui/side-nav";
import { MEMBER, SIDE_NAV_GROUPS } from "@/features/account/mypage-data";

/**
 * 마이페이지 골격 — node 277:6331
 * 좌측 250px 메뉴(쇼핑정보 요약 카드 포함) + 우측 868px 본문 2단.
 */
const SUMMARY_ROWS = [
  { label: "총 주문액", value: MEMBER.totalOrderAmount },
  { label: "총주문", value: MEMBER.orderCount },
  { label: "적립금", value: MEMBER.points },
  { label: "예치금", value: MEMBER.deposit },
  { label: "쿠폰", value: MEMBER.coupons },
  { label: "찜한 상품", value: MEMBER.wishlist },
];

export function MyPageShell({
  activeHref,
  children,
}: {
  activeHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-[22px]">
      <div className="lg:w-[250px] lg:shrink-0">
        <SideNav groups={SIDE_NAV_GROUPS} activeHref={activeHref}>
          {/* 쇼핑정보 요약 — node 277:6385 */}
          <div className="flex flex-col gap-6 rounded-field bg-surface-soft px-5 py-6">
            <p className="text-center text-[16px] text-ink">
              <span className="font-bold">{MEMBER.name}</span>님의 쇼핑정보
            </p>
            <dl className="flex flex-col gap-4 text-[14px] text-ink">
              {SUMMARY_ROWS.map((row) => (
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
