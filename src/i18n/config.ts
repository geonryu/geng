/**
 * 다국어 설정.
 *
 * 한국어가 기본이고 접두사가 없다 (`/cart`). 영어는 `/en/cart`.
 * 기본 로케일은 src/proxy.ts 가 redirect 가 아니라 **rewrite** 로 처리하므로
 * 주소창에는 `/ko` 가 나타나지 않는다 — 기존 URL 과 SEO 를 그대로 유지한다.
 */

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * 로케일별 기본 통화.
 *
 * 금액은 운영자가 통화별로 **직접 입력**한다. 환율 환산은 하지 않는다 —
 * 자동 환산과 국가별 결제는 AGENTS.md Phase 2 다.
 * 해당 통화 가격이 없으면 KRW 로 폴백해 표시한다.
 */
export const LOCALE_CURRENCY = {
  ko: "KRW",
  en: "USD",
} as const satisfies Record<Locale, string>;

export type CurrencyCode = (typeof LOCALE_CURRENCY)[Locale];

/** `Intl.NumberFormat` 에 넘길 BCP 47 태그. */
export const LOCALE_TAG = {
  ko: "ko-KR",
  en: "en-US",
} as const satisfies Record<Locale, string>;

/**
 * 내부 링크에 로케일 접두사를 붙인다.
 * 기본 로케일(ko)은 접두사가 없으므로 경로를 그대로 돌려준다.
 *
 *   localeHref("ko", "/cart")  // "/cart"
 *   localeHref("en", "/cart")  // "/en/cart"
 *   localeHref("en", "/")      // "/en"
 */
export function localeHref(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

/** 경로 앞의 로케일 조각을 떼어낸다. 없으면 기본 로케일로 본다. */
export function splitLocale(pathname: string): {
  locale: Locale;
  rest: string;
} {
  const [, first = "", ...others] = pathname.split("/");
  if (isLocale(first)) {
    return { locale: first, rest: `/${others.join("/")}` };
  }
  return { locale: DEFAULT_LOCALE, rest: pathname };
}
