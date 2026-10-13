"use client";

import { createContext, useContext } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * 현재 로케일과 UI 사전을 Client Component 에 전달한다.
 *
 * Server Component 는 `next/root-params` 와 `getDictionary()` 를 직접 쓰면 되지만,
 * Client Component 에서는 그 API 를 쓸 수 없다. 루트 레이아웃에서 한 번 심어두고
 * 아래에서는 `useLocale()` / `useDict()` 로 꺼낸다 — prop drilling 을 피한다.
 *
 * `usePathname()` 으로 로케일을 추론하지 않는 이유: 기본 로케일은 proxy 가 rewrite 로
 * 처리해 경로에 드러나지 않고, rewrite 상황에서 usePathname 이 무엇을 돌려주는지에
 * 기대면 깨지기 쉽다.
 *
 * 사전 전체가 클라이언트 번들로 내려간다. UI 문자열만 담고 있어 크기가 작고,
 * 상품·배너 같은 콘텐츠는 여기 없다(그건 DB 번역 테이블이 소유한다).
 */
type I18nValue = { locale: Locale; dict: Dictionary };

const I18nContext = createContext<I18nValue | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dict }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(I18nContext)?.locale ?? DEFAULT_LOCALE;
}

/** UI 사전. Provider 바깥에서 쓰면 즉시 알 수 있도록 던진다. */
export function useDict(): Dictionary {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useDict 는 LocaleProvider 안에서만 쓸 수 있습니다.");
  }
  return value.dict;
}
