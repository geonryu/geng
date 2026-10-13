"use client";

import { createContext, useContext } from "react";

import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";

/**
 * 현재 로케일을 Client Component 에 전달한다.
 *
 * Server Component 는 `next/root-params` 의 `locale()` 을 직접 쓰면 되지만,
 * Client Component 에서는 그 API 를 쓸 수 없다. 루트 레이아웃에서 한 번
 * 심어두고 아래에서는 `useLocale()` 로 꺼낸다 — prop drilling 을 피한다.
 *
 * `usePathname()` 으로 추론하지 않는 이유: 기본 로케일은 proxy 가 rewrite 로
 * 처리하므로 경로에 로케일이 드러나지 않고, rewrite 상황에서 usePathname 이
 * 무엇을 돌려주는지에 기대면 깨지기 쉽다.
 */
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
