import { createBrowserClient } from "@supabase/ssr";

import { requireSupabaseEnv } from "@/lib/supabase/env";

/**
 * Client Component 용 Supabase 클라이언트 (anon key).
 *
 * 이 저장소는 Server Component 가 기본이라 쓰임이 드물다. 대부분의 조회는
 * 각 feature 의 queries.ts, 변경은 actions.ts 의 서버 액션을 쓴다.
 */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv();
  return createBrowserClient(url, anonKey);
}
