"use client";

import Link from "next/link";

import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-context";

/**
 * 로케일을 유지하는 내부 링크.
 *
 * `href="/cart"` 를 넘기면 한국어에서는 `/cart`, 영문에서는 `/en/cart` 로 간다.
 * 그래서 호출부는 로케일을 신경 쓰지 않고 **논리 경로만** 적으면 된다.
 *
 * 외부 URL(`http...`)이나 앵커(`#...`)는 그대로 둔다.
 */
export function LocaleLink({
  href,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  const locale = useLocale();
  const isInternal = href.startsWith("/");

  return <Link href={isInternal ? localeHref(locale, href) : href} {...props} />;
}
