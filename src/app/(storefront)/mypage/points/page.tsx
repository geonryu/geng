import type { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { HistoryPanel } from "@/features/account/components/history-panel";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { MEMBER } from "@/features/account/mypage-data";

export const metadata: Metadata = {
  title: "나의 적립금 | Gen.G Online Store",
};

/** 나의 적립금 — Figma 최종화면 (node 277:6916) */
const COLUMNS = [
  { key: "date", label: "발생일자", width: 148 },
  { key: "detail", label: "상세내역", width: 198, align: "start" as const },
  { key: "earned", label: "적립금액", width: 130 },
  { key: "used", label: "사용금액", width: 130 },
  { key: "balance", label: "잔액", width: 130 },
  { key: "order", label: "주문번호", width: 132 },
];

const ROWS = Array.from({ length: 10 }, () => ({
  date: "발생일자",
  detail: "상세내역",
  earned: "적립금액",
  used: "사용금액",
  balance: "잔액",
  order: "주문번호",
}));

const SUMMARY = [
  { label: "총 적립금", value: "0원" },
  { label: "미가용 적립금", value: "0원" },
  { label: "사용가능 적립금", value: "32,600원" },
  { label: "사용된 적립금", value: "0원" },
  { label: "환불예정 적립금", value: "0원" },
];

export default function MyPagePointsPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "적립금" },
        ]}
      />

      <MyPageShell activeHref="/mypage/points">
        <div className="flex flex-col gap-2">
          <h1 className="text-[24px] font-bold text-ink">나의 적립금</h1>
          <p className="text-[14px] text-muted">
            {MEMBER.name}님이 사용가능한 적립금은{" "}
            <span className="font-bold text-ink">32,600원</span> 입니다.
          </p>
        </div>

        <dl className="grid gap-x-10 gap-y-[6px] rounded-field bg-surface-soft px-5 py-6 sm:grid-cols-2">
          {SUMMARY.map((item) => (
            <div key={item.label} className="flex justify-between text-[14px]">
              <dt className="text-ink">{item.label}</dt>
              <dd className="text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <HistoryPanel title="적립금 내역" columns={COLUMNS} rows={ROWS} />
      </MyPageShell>
    </>
  );
}
