"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRightIcon, ChevronToggleIcon } from "@/components/ui/icons";

/**
 * 약관 동의 — node 277:8013
 * 전체 동의 행은 사각 체크(check02)에 아래 테두리, 개별 항목은 원형 체크(check01)에
 * 우측 셰브런으로 약관 전문을 연다. 쇼핑정보 수신은 하위 채널 두 개를 품는다.
 *
 * 개별 체크박스는 name="terms" 를 달아 FormData 로 그대로 넘어간다
 * (서버 액션이 formData.getAll("terms") 로 읽는다). "전체 동의" 행은 조작용이라
 * name 을 주지 않는다.
 */
const TERMS = [
  { id: "service", label: "[필수] 이용약관 동의", required: true },
  { id: "privacy", label: "[필수] 개인정보 수집 및 이용 동의", required: true },
  { id: "marketing", label: "[선택] 쇼핑정보 수신 동의", required: false },
] as const;

const MARKETING_CHANNELS = [
  { id: "sms", label: "SMS 수신" },
  { id: "email", label: "이메일 수신" },
] as const;

export function TermsAgreement({
  defaultChecked = [],
  error,
}: {
  defaultChecked?: string[];
  error?: string[];
}) {
  const [checked, setChecked] = useState<string[]>(defaultChecked);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const allIds = [
    ...TERMS.map((term) => term.id),
    ...MARKETING_CHANNELS.map((channel) => channel.id),
  ];
  const allChecked = allIds.every((id) => checked.includes(id));

  const toggle = (id: string) =>
    setChecked((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );

  return (
    <div className="flex flex-col gap-2">
      <label className="flex h-[45px] items-center gap-[10px] border-b border-line bg-white">
        <Checkbox
          shape="square"
          checked={allChecked}
          onChange={() => setChecked(allChecked ? [] : allIds)}
        />
        <span className="text-[14px] text-ink">
          모든 약관을 확인하고 전체 동의합니다.
        </span>
      </label>

      <div className="flex flex-col">
        {TERMS.map((term) => (
          <div key={term.id} className="flex flex-col">
            <div className="flex items-center justify-between py-3">
              <label className="flex items-center gap-2">
                <Checkbox
                  shape="circle"
                  name="terms"
                  value={term.id}
                  checked={checked.includes(term.id)}
                  onChange={() => toggle(term.id)}
                />
                <span className="text-[14px] text-muted">{term.label}</span>
              </label>
              <button
                type="button"
                aria-label={`${term.label} 전문 보기`}
                aria-expanded={openTerm === term.id}
                aria-controls={`term-body-${term.id}`}
                onClick={() =>
                  setOpenTerm((id) => (id === term.id ? null : term.id))
                }
                className="text-muted"
              >
                {openTerm === term.id ? (
                  <ChevronToggleIcon direction="up" />
                ) : (
                  <ChevronRightIcon />
                )}
              </button>
            </div>

            {openTerm === term.id && (
              <div
                id={`term-body-${term.id}`}
                className="mb-2 max-h-[180px] overflow-y-auto rounded-field bg-surface-soft p-4 text-[13px] text-muted"
              >
                약관 전문은 콘텐츠 관리에서 등록합니다. 아직 등록된 내용이
                없습니다.
              </div>
            )}

            {term.id === "marketing" && (
              <div className="flex items-center gap-6 px-7 py-2">
                {MARKETING_CHANNELS.map((channel) => (
                  <label key={channel.id} className="flex items-center gap-2">
                    <Checkbox
                      shape="circle"
                      name="terms"
                      value={channel.id}
                      checked={checked.includes(channel.id)}
                      onChange={() => toggle(channel.id)}
                    />
                    <span className="text-[14px] text-muted">
                      {channel.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {error?.map((message) => (
        <p key={message} className="text-[13px] text-sale">
          {message}
        </p>
      ))}
    </div>
  );
}
