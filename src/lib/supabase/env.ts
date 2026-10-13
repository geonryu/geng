/**
 * Supabase 환경변수 접근점.
 *
 * 키를 코드에 적지 않는다 (AGENTS.md §4). 값이 비어 있으면 조용히 undefined 로
 * 흘러가 런타임 한참 뒤에 터지므로, 여기서 즉시 무엇이 비었는지 알려준다.
 */

export function requireSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase 환경변수가 없습니다. .env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY 를 설정하세요 (.env.example 참고).",
    );
  }

  return { url, anonKey };
}

/** service role 키. 서버 전용이며 절대 클라이언트 번들에 들어가면 안 된다. */
export function requireServiceRoleKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY 가 없습니다. 서버 환경변수로만 설정하세요 " +
        "(NEXT_PUBLIC_ 접두사를 붙이면 클라이언트에 노출됩니다).",
    );
  }

  return key;
}
