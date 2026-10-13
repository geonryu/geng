import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { requireSupabaseEnv } from "@/lib/supabase/env";

/**
 * Server Component · Server Action · Route Handler 용 Supabase 클라이언트.
 *
 * 요청마다 새로 만든다 — 클라이언트를 요청 간에 공유하면 세션이 섞인다.
 * 쿠키는 getAll/setAll 쌍으로만 다룬다 (@supabase/ssr 의 deprecated get/set/remove 금지).
 *
 * Server Component 에서는 쿠키 쓰기가 막혀 있어 setAll 이 throw 하는데,
 * 세션 갱신은 src/proxy.ts 가 책임지므로 여기서는 조용히 무시한다.
 */
export async function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Server Component 에서 호출된 경우. proxy 가 갱신을 대신한다.
        }
      },
    },
  });
}
