"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { TextField } from "@/components/ui/text-field";
import { login } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import { LocaleField } from "@/i18n/locale-field";
import type { FormState } from "@/features/account/schemas";

/**
 * 로그인 폼 — node 277:6079(회원) · 277:8077(비회원)
 * 시안 4종은 이 폼의 탭 × 입력 상태 변형이다.
 * 모든 칸이 채워지면 제출 버튼이 surface-soft에서 ink로 활성화된다 (node 277:8177).
 *
 * 회원 탭은 login 서버 액션에 연결돼 있다. 비회원 탭은 주문조회(주문번호로 찾기)라
 * 인증이 아니며, 통합 주문 read-model 이 붙는 단계에서 연결한다.
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
  /** proxy 가 보호 경로에서 돌려보낼 때 넘겨준 원래 목적지 */
  nextPath,
}: {
  showGuestOrder?: boolean;
  nextPath?: string;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    login,
    undefined,
  );

  const [tab, setTab] = useState("member");
  const [values, setValues] = useState<Record<string, string>>({
    loginId: state?.values?.loginId ?? "",
  });

  const isMember = tab === "member";
  const fields = isMember ? MEMBER_FIELDS : GUEST_FIELDS;
  const filled = fields.every((field) => (values[field.id] ?? "").length > 0);

  const setValue = (id: string, value: string) =>
    setValues((current) => ({ ...current, [id]: value }));

  return (
    <form
      action={isMember ? formAction : undefined}
      className="mx-auto flex w-full max-w-[550px] flex-col gap-6"
    >
      <LocaleField />

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
            name={field.id}
            label={field.label}
            type={field.type}
            value={values[field.id] ?? ""}
            onValueChange={(value) => setValue(field.id, value)}
          />
        ))}
        {isMember && <FieldError messages={state?.errors?.loginId} />}
      </div>

      {nextPath && <input type="hidden" name="next" value={nextPath} />}

      {isMember && state?.message && (
        <p role="alert" className="text-[14px] text-sale">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        tone={filled && !pending ? "solid" : "muted"}
        fullWidth
        disabled={!filled || pending}
      >
        {pending ? "확인 중…" : isMember ? "로그인" : "비회원 로그인"}
      </Button>

      <nav className="flex items-center justify-center text-[13px] text-muted">
        <LocaleLink href="/find-id" className="px-[6px] py-[10px] hover:text-ink">
          아이디 찾기
        </LocaleLink>
        <span aria-hidden="true">|</span>
        <LocaleLink
          href="/find-password"
          className="px-[6px] py-[10px] hover:text-ink"
        >
          비밀번호 찾기
        </LocaleLink>
        <span aria-hidden="true">|</span>
        <LocaleLink href="/signup" className="px-[6px] py-[10px] text-ink">
          회원가입
        </LocaleLink>
      </nav>

      {showGuestOrder && (
        <div className="flex justify-center">
          <Button tone="muted" size="sm">
            비회원 주문하기
          </Button>
        </div>
      )}
    </form>
  );
}
