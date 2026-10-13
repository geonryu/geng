"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { BoxField } from "@/components/ui/text-field";
import { withdraw } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import { LocaleField } from "@/i18n/locale-field";
import type { FormState } from "@/features/account/schemas";

/**
 * 회원탈퇴 확인 — **Figma 시안 없음**.
 * 되돌릴 수 없는 동작이라 아이디를 직접 입력해야 버튼이 열린다.
 * 이 저장소에는 모달이 없어 인라인 확인으로 둔다.
 */
export function WithdrawForm({ loginId }: { loginId: string }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    withdraw,
    undefined,
  );
  const [typed, setTyped] = useState("");

  const matches = typed.trim() === loginId;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <LocaleField />

      <FormField label="확인" required>
        <BoxField
          name="confirmLoginId"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          placeholder={`탈퇴하려면 아이디(${loginId})를 입력하세요`}
          aria-label="탈퇴 확인용 아이디"
        />
        <FieldError messages={state?.errors?.confirmLoginId} />
      </FormField>

      {state?.message && (
        <p role="alert" className="text-[14px] text-sale">
          {state.message}
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          tone={matches && !pending ? "solid" : "muted"}
          disabled={!matches || pending}
          className="w-[200px]"
        >
          {pending ? "처리 중…" : "탈퇴하기"}
        </Button>
      </div>
    </form>
  );
}
