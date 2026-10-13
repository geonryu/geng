import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { requireServiceRoleKey, requireSupabaseEnv } from "@/lib/supabase/env";

/**
 * service role 클라이언트 — RLS 를 우회한다.
 *
 * 쓰는 곳은 셋뿐이다:
 *   1. 시드 스크립트
 *   2. 외부몰 동기화 잡 (unified_orders 적재 등, 되쓰기 차단 트리거를 통과해야 함)
 *   3. 어드민 전용 쓰기
 *
 * 사용자 요청을 그대로 태우면 안 된다.
 *
 * SUPABASE_SERVICE_ROLE_KEY 는 NEXT_PUBLIC_ 접두사가 없어 Next 가 클라이언트
 * 번들에서 걷어내지만, 실수로 Client Component 에 import 되는 것까지는 막지
 * 못하므로 런타임 가드를 둔다. (`server-only` 패키지를 쓰면 빌드 타임에 막을 수
 * 있는데, 승인되지 않은 의존성이라 지금은 넣지 않았다 — AGENTS.md §4.)
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "createAdminClient 는 서버에서만 쓸 수 있습니다. " +
        "Client Component 에서 호출하면 service role 키가 노출됩니다.",
    );
  }

  const { url } = requireSupabaseEnv();

  return createSupabaseClient(url, requireServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
