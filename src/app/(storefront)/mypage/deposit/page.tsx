import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { HistoryPanel } from "@/features/account/components/history-panel";
import { MyPageShell } from "@/features/account/components/mypage-shell";

export const metadata: Metadata = {
  title: "예치금 조회 | Gen.G Online Store",
};

/** 예치금 조회 — Figma 최종화면 (node 277:7251) */
const COLUMNS = [
  { key: "date", label: "발생일자", width: 148 },
  { key: "order", label: "주문명", width: 198, align: "start" as const },
  { key: "deposit", label: "예치금", width: 130 },
  { key: "refund", label: "현금환불", width: 130 },
  { key: "balance", label: "잔액", width: 130 },
  { key: "detail", label: "내용", width: 132 },
];

const ROWS = Array.from({ length: 10 }, () => ({
  date: "발생일자",
  order: "주문명",
  deposit: "예치금",
  refund: "현금환불",
  balance: "잔액",
  detail: "내용",
}));

export default function MyPageDepositPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "예치금" },
        ]}
      />

      <MyPageShell activeHref="/mypage/deposit">
        <div className="flex flex-col gap-2">
          <h1 className="text-[24px] font-bold text-ink">예치금 조회</h1>
          <p className="text-[14px] text-muted">
            예치금은 주문취소 등 결제대금 환불, 초과 입금차액 환불 등으로 발생한
            금액입니다.
            <br />
            사용가능한 예치금은 상품 구매시 현금과 동일하게 사용할 수 있습니다.
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-[6px] rounded-field bg-surface-soft px-5 py-6 sm:grid-cols-2">
          <div className="flex justify-between text-[14px] text-ink">
            <dt>사용가능 예치금</dt>
            <dd>0원</dd>
          </div>
          <div className="flex justify-between text-[14px] text-ink">
            <dt>현금환불 예치금</dt>
            <dd>0원</dd>
          </div>
        </dl>

        <HistoryPanel title="예치금 내역" columns={COLUMNS} rows={ROWS} />
      </MyPageShell>
    </>
  );
}
