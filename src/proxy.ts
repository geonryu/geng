import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  isLocale,
  localeHref,
  splitLocale,
} from "@/i18n/config";

/**
 * Proxy — Next.js 16 에서 Middleware 가 이 이름으로 바뀌었다
 * (node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md).
 * **프로젝트당 하나만** 허용되므로 로케일 처리와 세션 처리가 이 파일에 함께 있다.
 *
 * 순서가 중요하다:
 *   1. 로케일 정규화 — 먼저 해야 `/en/mypage` 도 아래 보호 규칙에 걸린다.
 *   2. Supabase 세션 쿠키 갱신.
 *   3. 보호 경로 리다이렉트.
 *
 * 로케일 규칙
 *   `/cart`     → `/ko/cart` 로 **rewrite** (주소창은 `/cart` 유지 — 기존 URL·SEO 보존)
 *   `/en/cart`  → 그대로 통과
 *   `/ko/cart`  → `/cart` 로 **redirect** (같은 화면에 URL 이 둘이 되는 것을 막는다)
 *
 * 공식 가이드대로 여기서 **DB 조회는 하지 않는다**. proxy 는 prefetch 를 포함해
 * 모든 요청에서 돌기 때문이다. 실제 권한 판단은 features/account/queries.ts 의 DAL 이 한다.
 */

/** 로그인이 필요한 경로 (로케일 접두사를 뗀 기준). */
const PROTECTED = ["/mypage"];

/** 로그인 상태면 들어갈 이유가 없는 경로. */
const GUEST_ONLY = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment = ""] = pathname.split("/");

  // ── 1. 로케일 정규화 ────────────────────────────────────────────────
  // 기본 로케일을 URL 에 드러내지 않는다. `/ko/...` 로 들어오면 접두사를 떼고 보낸다.
  if (firstSegment === DEFAULT_LOCALE) {
    const stripped = pathname.slice(`/${DEFAULT_LOCALE}`.length) || "/";
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url);
  }

  const hasLocalePrefix = isLocale(firstSegment);
  // 접두사가 없으면 기본 로케일 라우트로 rewrite 한다. 주소창은 그대로다.
  const internalPathname = hasLocalePrefix
    ? pathname
    : `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = internalPathname;

  const makeResponse = () =>
    hasLocalePrefix
      ? NextResponse.next({ request })
      : NextResponse.rewrite(rewriteUrl, { request });

  let response = makeResponse();

  // 로케일을 뗀 "논리 경로". 보호 규칙은 이 값으로 판단한다.
  const { locale, rest } = splitLocale(pathname);

  // ── 2. 세션 쿠키 갱신 ───────────────────────────────────────────────
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 환경변수가 아직 없으면(초기 세팅 등) 인증 없이 통과시킨다.
  // 여기서 throw 하면 모든 페이지가 죽는다.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = makeResponse();
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // getUser() 호출이 곧 토큰 갱신 지점이다. 빼면 세션이 조용히 만료된다.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── 3. 보호 경로 ────────────────────────────────────────────────────
  if (!user && PROTECTED.some((path) => rest.startsWith(path))) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localeHref(locale, "/login");
    redirectUrl.searchParams.set("next", localeHref(locale, rest));
    return NextResponse.redirect(redirectUrl);
  }

  if (user && GUEST_ONLY.some((path) => rest === path)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localeHref(locale, "/mypage");
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // 정적 자산과 이미지 최적화 요청에서는 돌 이유가 없다.
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico).*)"],
};
