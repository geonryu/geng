import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy — Next.js 16 에서 Middleware 가 이 이름으로 바뀌었다
 * (node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md).
 * 파일은 프로젝트당 하나만 허용되고 app 과 같은 레벨(src/)에 둬야 한다.
 *
 * 하는 일은 둘뿐이다:
 *   1. Supabase 세션 쿠키 갱신 — Server Component 에서는 쿠키를 못 쓰므로
 *      토큰 리프레시를 여기서 응답에 써 준다.
 *   2. 보호 경로의 낙관적 리다이렉트.
 *
 * 공식 가이드대로 **DB 조회는 하지 않는다**. proxy 는 prefetch 를 포함해 모든
 * 라우트에서 돌기 때문에 여기서 질의하면 비용이 터진다. 실제 권한 판단은
 * features/account/queries.ts 의 DAL 이 담당한다.
 */

/** 로그인이 필요한 경로. */
const PROTECTED = ["/mypage"];

/** 로그인 상태면 들어갈 이유가 없는 경로. */
const GUEST_ONLY = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 환경변수가 아직 없으면(로컬 초기 세팅 등) 인증 없이 통과시킨다.
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
        response = NextResponse.next({ request });
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

  const { pathname } = request.nextUrl;

  if (!user && PROTECTED.some((path) => pathname.startsWith(path))) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && GUEST_ONLY.some((path) => pathname === path)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/mypage";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // 정적 자산과 이미지 최적화 요청에서는 돌 이유가 없다.
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico).*)"],
};
