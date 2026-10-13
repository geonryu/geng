"use client";

import { LocaleLink } from "@/components/ui/locale-link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { BoxField } from "@/components/ui/text-field";
import { findId, findPassword } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import type { FormState } from "@/features/account/schemas";

/**
 * 아이디/비밀번호 찾기 — **Figma 시안 없음**.
 * 로그인 화면(node 277:6079) 하단 링크가 가리키던 두 경로다.
 * 회원가입 폼의 FormField + BoxField 구성을 그대로 쓰고 폭만 550px 로 맞췄다.
 */
export function FindAccountForm({ mode }: { mode: "id" | "password" }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    mode === "id" ? findId : findPassword,
    undefined,
  );

  const values = state?.values ?? {};
  const errors = state?.errors ?? {};

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-[550px] flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        {mode === "id" ? (
          <FormField label="이름" required>
            <BoxField
              name="name"
              defaultValue={values.name}
              placeholder="가입 시 입력한 이름"
              aria-label="이름"
            />
            <FieldError messages={errors.name} />
          </FormField>
        ) : (
          <FormField label="아이디" required>
            <BoxField
              name="loginId"
              defaultValue={values.loginId}
              placeholder="아이디 입력"
              aria-label="아이디"
            />
            <FieldError messages={errors.loginId} />
          </FormField>
        )}

        <FormField label="이메일" required>
          <BoxField
            name="email"
            type="email"
            defaultValue={values.email}
            placeholder="가입 시 입력한 이메일"
            aria-label="이메일"
          />
          <FieldError messages={errors.email} />
        </FormField>
      </div>

      {state?.message && (
        <p
          role="status"
          className="rounded-field bg-surface-soft px-5 py-4 text-center text-[14px] text-ink"
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        tone={pending ? "muted" : "solid"}
        disabled={pending}
        fullWidth
      >
        {pending ? "확인 중…" : mode === "id" ? "아이디 찾기" : "재설정 메일 받기"}
      </Button>

      <nav className="flex items-center justify-center text-[13px] text-muted">
        <LocaleLink href="/login" className="px-[6px] py-[10px] hover:text-ink">
          로그인
        </LocaleLink>
        <span aria-hidden="true">|</span>
        <LocaleLink
          href={mode === "id" ? "/find-password" : "/find-id"}
          className="px-[6px] py-[10px] hover:text-ink"
        >
          {mode === "id" ? "비밀번호 찾기" : "아이디 찾기"}
        </LocaleLink>
        <span aria-hidden="true">|</span>
        <LocaleLink href="/signup" className="px-[6px] py-[10px] text-ink">
          회원가입
        </LocaleLink>
      </nav>
    </form>
  );
}
