"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { TextField } from "@/components/ui/text-field";

/**
 * 로그인 폼 — node 277:6079(회원) · 277:8077(비회원)
 * 시안 4종은 이 폼의 탭 × 입력 상태 변형이다.
 * 모든 칸이 채워지면 제출 버튼이 surface-soft에서 ink로 활성화된다 (node 277:8177).
 */
const MEMBER_FIELDS = [
  { id: "loginId", label: "아이디", type: "text" },
  { id: "password", label: "비밀번호", type: "password" },
] as const;

const GUEST_FIELDS = [
  { id: "ordererName", label: "주문자명", type: "text" },
  { id: "orderNumber", label: "주문번호", type: "text" },
  { id: "orderPassword", label: "비회원주문 비밀번호", type: "password" },
] as const;

export function LoginForm({
  /** 장바구니에서 넘어온 경우 하단에 비회원 주문 진입점이 붙는다 (node 277:6126) */
  showGuestOrder = false,
}: {
  showGuestOrder?: boolean;
}) {
  const [tab, setTab] = useState("member");
  const [values, setValues] = useState<Record<string, string>>({});

  const fields = tab === "member" ? MEMBER_FIELDS : GUEST_FIELDS;
  const filled = fields.every((field) => (values[field.id] ?? "").length > 0);

  const setValue = (id: string, value: string) =>
    setValues((current) => ({ ...current, [id]: value }));

  return (
    <div className="mx-auto flex w-full max-w-[550px] flex-col gap-6">
      <SegmentedToggle
        items={[
          { id: "member", label: "회원" },
          { id: "guest", label: "비회원" },
        ]}
        activeId={tab}
        onSelect={setTab}
      />

      <div className="flex flex-col gap-4">
        {fields.map((field) => (
          <TextField
            key={field.id}
            label={field.label}
            type={field.type}
            value={values[field.id] ?? ""}
            onValueChange={(value) => setValue(field.id, value)}
          />
        ))}
      </div>

      <Button
        type="submit"
        size="lg"
        tone={filled ? "solid" : "muted"}
        fullWidth
        disabled={!filled}
      >
        {tab === "member" ? "로그인" : "비회원 로그인"}
      </Button>

      <nav className="flex items-center justify-center text-[13px] text-muted">
        <Link href="/find-id" className="px-[6px] py-[10px] hover:text-ink">
          아이디 찾기
        </Link>
        <span aria-hidden="true">|</span>
        <Link
          href="/find-password"
          className="px-[6px] py-[10px] hover:text-ink"
        >
          비밀번호 찾기
        </Link>
        <span aria-hidden="true">|</span>
        <Link href="/signup" className="px-[6px] py-[10px] text-ink">
          회원가입
        </Link>
      </nav>

      {showGuestOrder && (
        <div className="flex justify-center">
          <Button tone="muted" size="sm">
            비회원 주문하기
          </Button>
        </div>
      )}
    </div>
  );
}
