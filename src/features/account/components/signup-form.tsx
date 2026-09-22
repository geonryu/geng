"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { SelectField } from "@/components/ui/select-field";
import { BoxField } from "@/components/ui/text-field";
import { TermsAgreement } from "@/features/account/components/terms-agreement";

/**
 * 회원가입 폼 — node 277:7856 (550px)
 * 입력은 로그인의 언더라인이 아니라 45px 박스(BoxField)를 쓴다.
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

export function SignupForm() {
  const [memberType, setMemberType] = useState("personal");
  const [gender, setGender] = useState<string | null>(null);

  return (
    <form className="mx-auto flex w-full max-w-[550px] flex-col gap-6">
      <div className="flex flex-col gap-4">
        <FormField label="회원구분" required>
          <SegmentedToggle
            items={MEMBER_TYPES}
            activeId={memberType}
            onSelect={setMemberType}
            size="sm"
          />
        </FormField>

        <FormField label="이메일" required>
          <div className="flex items-center gap-2">
            <BoxField placeholder="이메일 입력" aria-label="이메일 아이디" />
            <span className="text-[14px] font-bold text-ink">@</span>
            <SelectField aria-label="이메일 도메인" defaultValue="">
              <option value="">도메인 선택</option>
              {EMAIL_DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </SelectField>
          </div>
        </FormField>

        <FormField label="아이디" required>
          <BoxField
            placeholder="ID (영문소문자/숫자, 4~16자)"
            aria-label="아이디"
          />
        </FormField>

        <FormField label="비밀번호" required>
          <BoxField
            type="password"
            placeholder="비밀번호 (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)"
            aria-label="비밀번호"
          />
        </FormField>

        <FormField label="비밀번호 확인" required>
          <BoxField
            type="password"
            placeholder="비밀번호 재입력"
            aria-label="비밀번호 확인"
          />
        </FormField>

        <FormField label="이름" required>
          <BoxField placeholder="이름 입력" aria-label="이름" />
        </FormField>

        <FormField label="생년월일" required>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex flex-1 items-center gap-2">
              <SelectField aria-label="년도" defaultValue="">
                <option value="">년도</option>
              </SelectField>
              <SelectField aria-label="월" defaultValue="">
                <option value="">월</option>
              </SelectField>
              <SelectField aria-label="일" defaultValue="">
                <option value="">일</option>
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
          </div>
        </FormField>

        <FormField label="주소">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <BoxField placeholder="우편번호" aria-label="우편번호" />
              <Button tone="outline" size="md" className="shrink-0 px-5">
                주소검색
              </Button>
            </div>
            <BoxField placeholder="주소 입력" aria-label="주소" />
            <BoxField placeholder="상세주소 입력" aria-label="상세주소" />
          </div>
        </FormField>

        <FormField label="휴대폰 번호">
          <div className="flex items-center gap-2">
            <SelectField aria-label="통신사 번호" defaultValue="010">
              {PHONE_PREFIXES.map((prefix) => (
                <option key={prefix} value={prefix}>
                  {prefix}
                </option>
              ))}
            </SelectField>
            <span className="text-[14px] font-bold text-ink">-</span>
            <BoxField aria-label="휴대폰 번호 중간자리" inputMode="numeric" />
            <span className="text-[14px] font-bold text-ink">-</span>
            <BoxField aria-label="휴대폰 번호 끝자리" inputMode="numeric" />
          </div>
        </FormField>
      </div>

      <FormField label="약관동의" required>
        <TermsAgreement />
      </FormField>

      <Button type="submit" size="lg" tone="muted" fullWidth>
        회원가입
      </Button>
    </form>
  );
}
