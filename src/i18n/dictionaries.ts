import { DEFAULT_LOCALE, type Locale } from "@/i18n/config";
import { currentLocale } from "@/i18n/server";
import en from "@/i18n/dictionaries/en.json";
import ko from "@/i18n/dictionaries/ko.json";

/**
 * UI 문자열 사전.
 *
 * 콘텐츠(상품명·배너 카피)는 여기 있지 않다 — 그건 운영자가 소유하고 DB 의
 * 번역 테이블에서 온다. 이 파일은 **우리가 소유한 UI 문자열**만 담는다.
 *
 * ko 를 기준 타입으로 삼아, en 에 키가 빠지면 타입 에러로 잡는다.
 * 값이 비어 있으면(미번역) ko 로 폴백한다.
 */
export type Dictionary = typeof ko;

const DICTIONARIES: Record<Locale, Dictionary> = {
  ko,
  en: en as Dictionary,
};

/** Server Component 전용. 현재 로케일의 사전을 돌려준다. */
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  return DICTIONARIES[locale ?? (await currentLocale())] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** 로케일을 이미 아는 경우(Client Component 로 내려보낼 때 등). */
export function dictionaryFor(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}
