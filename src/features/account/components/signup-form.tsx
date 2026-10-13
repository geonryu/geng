"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { SelectField } from "@/components/ui/select-field";
import { BoxField } from "@/components/ui/text-field";
import { signup } from "@/features/account/actions";
import { FieldError } from "@/features/account/components/field-error";
import { TermsAgreement } from "@/features/account/components/terms-agreement";
import type { FormState } from "@/features/account/schemas";

/**
 * 회원가입 폼 — node 277:7856 (550px)
 * 입력은 로그인의 언더라인이 아니라 45px 박스(BoxField)를 쓴다.
 *
 * 모든 입력에 name 을 달아 FormData 로 서버 액션에 넘긴다. 검증은 서버가 하고
 * 결과는 useActionState 로 받아 필드별 에러로 표시한다 — 시안의 placeholder 에만
 * 적혀 있던 규칙(아이디 4~16자, 비밀번호 10~16자 등)이 실제로 걸린다.
 */
const MEMBER_TYPES = [
  { id: "personal", label: "개인회원" },
  { id: "business", label: "사업자회원" },
  { id: "foreigner", label: "외국인회원(foreigner)" },
];

const GENDERS = [
  { id: "male", label: "남" },
  { id: "female", label: "여" },
];

const EMAIL_DOMAINS = ["gmail.com", "naver.com", "daum.net", "kakao.com"];
const PHONE_PREFIXES = ["010", "011", "016", "017", "018", "019", "02"];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1919 }, (_, i) =>
  String(CURRENT_YEAR - i),
);
const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

export function SignupForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    signup,
    undefined,
  );

  const values = state?.values ?? {};
  const errors = state?.errors ?? {};

  const [memberType, setMemberType] = useState(
    values.memberType || "personal",
  );
  const [gender, setGender] = useState<string | null>(values.gender || null);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-[550px] flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <FormField label="회원구분" required>
          <SegmentedToggle
            items={MEMBER_TYPES}
            activeId={memberType}
            onSelect={setMemberType}
            size="sm"
          />
          <input type="hidden" name="memberType" value={memberType} />
        </FormField>

        <FormField label="이메일" required>
          <div className="flex items-center gap-2">
            <BoxField
              name="emailLocal"
              defaultValue={values.emailLocal}
              placeholder="이메일 입력"
              aria-label="이메일 아이디"
            />
            <span className="text-[14px] font-bold text-ink">@</span>
            <SelectField
              name="emailDomain"
              defaultValue={values.emailDomain ?? ""}
              aria-label="이메일 도메인"
            >
              <option value="">도메인 선택</option>
              {EMAIL_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </SelectField>
          </div>
          <FieldError messages={errors.emailLocal ?? errors.emailDomain} />
        </FormField>

        <FormField label="아이디" required>
          <BoxField
            name="loginId"
            defaultValue={values.loginId}
            placeholder="ID (영문소문자/숫자, 4~16자)"
            aria-label="아이디"
          />
          <FieldError messages={errors.loginId} />
        </FormField>

        <FormField label="비밀번호" required>
          <BoxField
            name="password"
            type="password"
            placeholder="비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)"
            aria-label="비밀번호"
          />
          <FieldError messages={errors.password} />
        </FormField>

        <FormField label="비밀번호 확인" required>
          <BoxField
            name="passwordConfirm"
            type="password"
            placeholder="비밀번호 재입력"
            aria-label="비밀번호 확인"
          />
          <FieldError messages={errors.passwordConfirm} />
        </FormField>

        <FormField label="이름" required>
          <BoxField
            name="name"
            defaultValue={values.name}
            placeholder="이름 입력"
            aria-label="이름"
          />
          <FieldError messages={errors.name} />
        </FormField>

        <FormField label="생년월일" required>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex flex-1 items-center gap-2">
              <SelectField
                name="birthYear"
                defaultValue={values.birthYear ?? ""}
                aria-label="년도"
              >
                <option value="">년도</option>
                {YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </SelectField>
              <SelectField
                name="birthMonth"
                defaultValue={values.birthMonth ?? ""}
                aria-label="월"
              >
                <option value="">월</option>
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </SelectField>
              <SelectField
                name="birthDay"
                defaultValue={values.birthDay ?? ""}
                aria-label="일"
              >
                <option value="">일</option>
                {DAYS.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </SelectField>
            </div>

            <div className="flex h-[45px] shrink-0 items-center">
              {GENDERS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={gender === item.id}
                  onClick={() => setGender(item.id)}
                  className={
                    "flex h-[45px] items-center justify-center border border-line px-5 text-[14px] " +
                    (index === 0 ? "rounded-l-field " : "rounded-r-field border-l-0 ") +
                    (gender === item.id
                      ? "bg-ink font-bold text-white"
                      : "bg-white text-muted")
                  }
                >
                  {item.label}
                </button>
              ))}
            </div>
            {gender && <input type="hidden" name="gender" value={gender} />}
          </div>
          <FieldError
            messages={
              errors.birthYear ?? errors.birthMonth ?? errors.birthDay
            }
          />
        </FormField>

        <FormField label="주소">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <BoxField
                name="postcode"
                defaultValue={values.postcode}
                placeholder="우편번호"
                aria-label="우편번호"
              />
              <Button tone="outline" size="md" className="shrink-0 px-5">
                주소검색
              </Button>
            </div>
            <BoxField
              name="address"
              defaultValue={values.address}
              placeholder="주소 입력"
              aria-label="주소"
            />
            <BoxField
              name="addressDetail"
              defaultValue={values.addressDetail}
              placeholder="상세주소 입력"
              aria-label="상세주소"
            />
          </div>
        </FormField>

        <FormField label="휴대폰 번호">
          <div className="flex items-center gap-2">
            <SelectField
              name="phonePrefix"
              defaultValue={values.phonePrefix || "010"}
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
              defaultValue={values.phoneMid}
              aria-label="휴대폰 번호 중간자리"
              inputMode="numeric"
            />
            <span className="text-[14px] font-bold text-ink">-</span>
            <BoxField
              name="phoneLast"
              defaultValue={values.phoneLast}
              aria-label="휴대폰 번호 끝자리"
              inputMode="numeric"
            />
          </div>
        </FormField>
      </div>

      <FormField label="약관동의" required>
        <TermsAgreement
          defaultChecked={values.terms ? values.terms.split(",") : []}
          error={errors.terms}
        />
      </FormField>

      {state?.message && (
        <p role="alert" className="text-[14px] text-sale">
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
        {pending ? "처리 중…" : "회원가입"}
      </Button>
    </form>
  );
}
