"use client";

import { useState } from "react";

import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";

/**
 * 내역 패널 — node 277:6781(주문/배송) · 277:6916(적립금) · 277:7251(예치금)
 * 세 화면이 제목 + 표 + 쪽 번호라는 같은 뼈대를 쓰므로 하나로 합쳤다.
 */
const PAGE_SIZE = 10;

export function HistoryPanel({
  title,
  columns,
  rows,
  footnote,
}: {
  title: string;
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  footnote?: React.ReactNode;
}) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visible = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="flex flex-col gap-5">
      <h2 className="text-[16px] font-bold text-ink">{title}</h2>

      <div className="flex flex-col items-end gap-2">
        <DataTable columns={columns} rows={visible} />
        {footnote && (
          <p className="flex items-center gap-1 text-[13px] text-ink">
            <span aria-hidden="true">∙</span>
            {footnote}
          </p>
        )}
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </section>
  );
}
