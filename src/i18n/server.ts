import { locale as rootLocale } from "next/root-params";

import {
  DEFAULT_LOCALE,
  isLocale,
  localeHref,
  type Locale,
} from "@/i18n/config";

/**
 * Server Component 전용 로케일 헬퍼.
 *
 * `next/root-params` 는 **Server Component 에서만** 쓸 수 있다 —
 * Client Component · Server Action · Route Handler 에서는 못 쓴다.
 * 그쪽은 LocaleProvider(useLocale) 나 FormData 의 locale 필드를 쓴다.
 */
export async function currentLocale(): Promise<Locale> {
  const value = await rootLocale();
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}

/** 현재 로케일을 붙인 내부 경로. */
export async function localePath(path: string): Promise<string> {
  return localeHref(await currentLocale(), path);
}

/**
 * 보호 경로에서 로그인으로 돌려보낼 때 쓰는 URL.
 * 돌아올 경로(`next`)에도 로케일을 유지한다.
 */
export async function loginPath(nextPath: string): Promise<string> {
  const locale = await currentLocale();
  const target = localeHref(locale, nextPath);
  return `${localeHref(locale, "/login")}?next=${encodeURIComponent(target)}`;
}
