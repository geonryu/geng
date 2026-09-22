import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { HistoryPanel } from "@/features/account/components/history-panel";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { ORDER_STATUS, RECENT_ORDERS } from "@/features/account/mypage-data";

export const metadata: Metadata = {
  title: "주문/배송내역 | Gen.G Online Store",
};

/** 주문/배송내역 — Figma 최종화면 (node 277:6603) */
const COLUMNS = [
  { key: "date", label: "주문일자", width: 130 },
  { key: "number", label: "주문번호", width: 174 },
  { key: "name", label: "상품명", width: 304, align: "start" as const },
  { key: "amount", label: "주문금액", width: 130 },
  { key: "status", label: "배송현황", width: 130 },
];

export default function MyPageOrdersPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "주문/배송내역" },
        ]}
      />

      <MyPageShell activeHref="/mypage/orders">
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

        <HistoryPanel
          title="최근주문내역"
          columns={COLUMNS}
          rows={RECENT_ORDERS}
          footnote={
            <span>
              환불/교환은{" "}
              <Link href="/mypage/claims" className="text-sale">
                취소/반품/교환 내역
              </Link>
              에서 확인할 수 있습니다.
            </span>
          }
        />
      </MyPageShell>
    </>
  );
}
