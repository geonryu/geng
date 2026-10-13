"use client";

import { useLocale } from "@/i18n/locale-context";

/**
 * 폼에 현재 로케일을 실어 보낸다.
 *
 * Server Action 에서는 `next/root-params` 를 쓸 수 없어서, 액션이 끝나고
 * 어느 로케일로 돌려보낼지 알 방법이 없다. 그래서 폼이 직접 알려준다.
 */
export function LocaleField() {
  const locale = useLocale();
  return <input type="hidden" name="locale" value={locale} />;
}
