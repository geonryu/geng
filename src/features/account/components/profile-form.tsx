"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SelectField } from "@/components/ui/select-field";
import { BoxField } from "@/components/ui/text-field";
import { updateProfile } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import type { Member } from "@/features/account/queries";
import type { FormState } from "@/features/account/schemas";

/**
 * 회원정보 수정 — **Figma 시안 없음**.
 * 회원가입 폼(node 277:7856)의 FormField + BoxField 45px 박스 구성을 그대로 따랐고,
 * 식별자인 아이디·이메일은 수정 대상에서 빼고 읽기 전용으로만 보여준다.
 */
const PHONE_PREFIXES = ["010", "011", "016", "017", "018", "019", "02"];

/** 저장된 "01012345678" 을 통신사/중간/끝자리로 되돌린다. */
function splitPhone(phone: string | null) {
  if (!phone) return { prefix: "010", mid: "", last: "" };
  const last = phone.slice(-4);
  const rest = phone.slice(0, -4);
  const prefix = PHONE_PREFIXES.find((p) => rest.startsWith(p)) ?? "010";
  return { prefix, mid: rest.slice(prefix.length), last };
}

export function ProfileForm({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    updateProfile,
    undefined,
  );

  const values = state?.values ?? {};
  const errors = state?.errors ?? {};
  const phone = splitPhone(member.phone);

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FormField label="아이디">
          <p className="flex h-[45px] items-center rounded-field bg-surface-soft px-5 text-[14px] text-muted">
            {member.loginId}
          </p>
        </FormField>

        <FormField label="이메일">
          <p className="flex h-[45px] items-center rounded-field bg-surface-soft px-5 text-[14px] text-muted">
            {member.email}
          </p>
        </FormField>

        <FormField label="이름" required>
          <BoxField
            name="name"
            defaultValue={values.name ?? member.name}
            aria-label="이름"
          />
          <FieldError messages={errors.name} />
        </FormField>

        <FormField label="휴대폰 번호">
          <div className="flex items-center gap-2">
            <SelectField
              name="phonePrefix"
              defaultValue={values.phonePrefix ?? phone.prefix}
              aria-label="통신사 번호"
            >
              {PHONE_PREFIXES.map((prefix) => (
                <option key={prefix} value={prefix}>
                  {prefix}
                </option>
              ))}
            </SelectField>
            <span className="text-[14px] font-bold text-ink">-</span>
            <BoxField
              name="phoneMid"
              defaultValue={values.phoneMid ?? phone.mid}
              aria-label="휴대폰 번호 중간자리"
              inputMode="numeric"
            />
            <span className="text-[14px] font-bold text-ink">-</span>
            <BoxField
              name="phoneLast"
              defaultValue={values.phoneLast ?? phone.last}
              aria-label="휴대폰 번호 끝자리"
              inputMode="numeric"
            />
          </div>
        </FormField>

        <FormField label="주소">
          <div className="flex flex-col gap-2">
            <BoxField
              name="postcode"
              defaultValue={values.postcode ?? member.postcode ?? ""}
              placeholder="우편번호"
              aria-label="우편번호"
            />
            <BoxField
              name="address"
              defaultValue={values.address ?? member.address ?? ""}
              placeholder="주소 입력"
              aria-label="주소"
            />
            <BoxField
              name="addressDetail"
              defaultValue={values.addressDetail ?? member.addressDetail ?? ""}
              placeholder="상세주소 입력"
              aria-label="상세주소"
            />
          </div>
        </FormField>
      </div>

      {state?.message && (
        <p role="status" className="text-[14px] text-ink">
          {state.message}
        </p>
      )}

      <div className="flex justify-center">
        <Button
          type="submit"
          size="lg"
          tone={pending ? "muted" : "solid"}
          disabled={pending}
          className="w-[200px]"
        >
          {pending ? "저장 중…" : "저장하기"}
        </Button>
      </div>
    </form>
  );
}
