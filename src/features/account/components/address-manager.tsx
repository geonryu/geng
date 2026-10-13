"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { FormField } from "@/components/ui/form-field";
import { BoxField } from "@/components/ui/text-field";
import { addAddress, deleteAddress } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import type { MemberAddress } from "@/features/account/queries";
import type { FormState } from "@/features/account/schemas";

/**
 * 배송주소록 관리 — **Figma 시안 없음**.
 * 회원가입의 주소 입력(node 277:7958) 구성을 목록 + 추가 폼으로 확장했다.
 * 기본 배송지는 하나뿐이다 (0001 마이그레이션의 부분 유니크 인덱스).
 */
export function AddressManager({ addresses }: { addresses: MemberAddress[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    addAddress,
    undefined,
  );
  const [adding, setAdding] = useState(addresses.length === 0);
  // Checkbox 는 제어형이라(checked 고정) 여기서 상태를 쥐어야 토글된다.
  const [isDefault, setIsDefault] = useState(false);

  const values = state?.values ?? {};
  const errors = state?.errors ?? {};

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-ink">배송주소록</h2>
          <Button
            tone="outline"
            size="sm"
            onClick={() => setAdding((open) => !open)}
          >
            {adding ? "닫기" : "배송지 추가"}
          </Button>
        </div>

        {addresses.length === 0 ? (
          <EmptyState message="등록된 배송지가 없습니다." />
        ) : (
          <ul className="flex flex-col border-t border-ink">
            {addresses.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-start justify-between gap-3 border-b border-line py-5"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="flex items-center gap-2 text-[14px] font-bold text-ink">
                    {item.recipient}
                    {item.label && (
                      <span className="text-[13px] font-medium text-muted">
                        {item.label}
                      </span>
                    )}
                    {item.isDefault && (
                      <span className="rounded-pill bg-ink px-2 py-[2px] text-[12px] font-medium text-white">
                        기본
                      </span>
                    )}
                  </p>
                  <p className="text-[14px] text-muted">
                    ({item.postcode}) {item.address} {item.addressDetail ?? ""}
                  </p>
                  {item.phone && (
                    <p className="text-[13px] text-muted">{item.phone}</p>
                  )}
                </div>

                <form action={deleteAddress}>
                  <input type="hidden" name="id" value={item.id} />
                  <Button type="submit" tone="outline" size="sm">
                    삭제
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      {adding && (
        <form
          action={formAction}
          className="flex flex-col gap-4 rounded-field border border-line p-6"
        >
          <h3 className="text-[16px] font-bold text-ink">배송지 추가</h3>

          <FormField label="배송지명">
            <BoxField
              name="label"
              defaultValue={values.label}
              placeholder="집, 회사 등"
              aria-label="배송지명"
            />
          </FormField>

          <FormField label="받는 분" required>
            <BoxField
              name="recipient"
              defaultValue={values.recipient}
              aria-label="받는 분"
            />
            <FieldError messages={errors.recipient} />
          </FormField>

          <FormField label="연락처">
            <BoxField
              name="phone"
              defaultValue={values.phone}
              placeholder="숫자만 입력"
              inputMode="numeric"
              aria-label="연락처"
            />
          </FormField>

          <FormField label="주소" required>
            <div className="flex flex-col gap-2">
              <BoxField
                name="postcode"
                defaultValue={values.postcode}
                placeholder="우편번호"
                aria-label="우편번호"
              />
              <FieldError messages={errors.postcode} />
              <BoxField
                name="address"
                defaultValue={values.address}
                placeholder="주소 입력"
                aria-label="주소"
              />
              <FieldError messages={errors.address} />
              <BoxField
                name="addressDetail"
                defaultValue={values.addressDetail}
                placeholder="상세주소 입력"
                aria-label="상세주소"
              />
            </div>
          </FormField>

          <label className="flex items-center gap-2">
            <Checkbox
              shape="square"
              name="isDefault"
              checked={isDefault}
              onChange={() => setIsDefault((on) => !on)}
            />
            <span className="text-[14px] text-ink">기본 배송지로 설정</span>
          </label>

          {state?.message && (
            <p role="status" className="text-[14px] text-ink">
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
            {pending ? "추가 중…" : "배송지 추가"}
          </Button>
        </form>
      )}
    </div>
  );
}
