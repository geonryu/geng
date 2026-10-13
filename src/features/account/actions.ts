"use server";

import { redirect } from "next/navigation";

import {
  OPTIONAL_TERMS,
  REQUIRED_TERMS,
  birthDateOf,
  emailOf,
  loginSchema,
  phoneOf,
  signupSchema,
  type FormState,
} from "@/features/account/schemas";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * 회원 서버 액션 — 가입 · 로그인 · 로그아웃.
 *
 * 인증은 Supabase Auth 가 소유하고, members 테이블은 프로필만 든다.
 * 로그인 식별자는 이메일이 아니라 "아이디"(login_id)라서, 로그인 시
 * login_id → email 을 먼저 찾은 뒤 Supabase 에 넘긴다.
 *
 * dev 프로젝트는 이메일 확인(Confirm email)을 꺼 두는 것을 전제로 한다.
 * 켜져 있으면 가입 직후 세션이 생기지 않아 완료 화면에서 로그인 상태가 아니다.
 */

/** FormData 를 평범한 객체로. 체크박스(terms)는 여러 값이 올 수 있다. */
function toObject(formData: FormData) {
  return {
    memberType: String(formData.get("memberType") ?? "personal"),
    emailLocal: String(formData.get("emailLocal") ?? ""),
    emailDomain: String(formData.get("emailDomain") ?? ""),
    loginId: String(formData.get("loginId") ?? ""),
    password: String(formData.get("password") ?? ""),
    passwordConfirm: String(formData.get("passwordConfirm") ?? ""),
    name: String(formData.get("name") ?? ""),
    birthYear: String(formData.get("birthYear") ?? ""),
    birthMonth: String(formData.get("birthMonth") ?? ""),
    birthDay: String(formData.get("birthDay") ?? ""),
    gender: (formData.get("gender") as string) || undefined,
    postcode: String(formData.get("postcode") ?? ""),
    address: String(formData.get("address") ?? ""),
    addressDetail: String(formData.get("addressDetail") ?? ""),
    phonePrefix: String(formData.get("phonePrefix") ?? ""),
    phoneMid: String(formData.get("phoneMid") ?? ""),
    phoneLast: String(formData.get("phoneLast") ?? ""),
    terms: formData.getAll("terms").map(String),
  };
}

/** 실패 시 비밀번호를 뺀 입력값만 돌려준다. */
function echoValues(raw: ReturnType<typeof toObject>): Record<string, string> {
  const { password, passwordConfirm, terms, gender, ...rest } = raw;
  void password;
  void passwordConfirm;
  return { ...rest, gender: gender ?? "", terms: terms.join(",") };
}

export async function signup(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = toObject(formData);
  const parsed = signupSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: echoValues(raw),
    };
  }

  const data = parsed.data;
  const email = emailOf(data);
  const admin = createAdminClient();

  // 아이디 중복은 DB unique 제약으로도 막히지만, 먼저 확인해 필드 에러로 돌려준다.
  const { data: taken } = await admin
    .from("members")
    .select("id")
    .eq("login_id", data.loginId)
    .maybeSingle();

  if (taken) {
    return {
      errors: { loginId: ["이미 사용 중인 아이디입니다."] },
      values: echoValues(raw),
    };
  }

  const supabase = await createClient();
  const { data: signed, error: signUpError } = await supabase.auth.signUp({
    email,
    password: data.password,
  });

  if (signUpError || !signed.user) {
    return {
      message:
        signUpError?.message ?? "가입에 실패했습니다. 잠시 후 다시 시도해주세요.",
      values: echoValues(raw),
    };
  }

  // 프로필 적재는 service role 로 한다 — 가입 직후 세션 수립 타이밍에 기대지 않는다.
  const { error: profileError } = await admin.from("members").insert({
    id: signed.user.id,
    member_type: data.memberType,
    login_id: data.loginId,
    name: data.name,
    email,
    birth_date: birthDateOf(data),
    gender: data.gender ?? null,
    phone: phoneOf(data),
    postcode: data.postcode || null,
    address: data.address || null,
    address_detail: data.addressDetail || null,
  });

  if (profileError) {
    // auth 사용자만 남으면 다음 가입 시도가 "이미 등록된 이메일"로 막힌다. 되돌린다.
    await admin.auth.admin.deleteUser(signed.user.id);
    return {
      message: `가입 처리 중 오류가 발생했습니다. (${profileError.message})`,
      values: echoValues(raw),
    };
  }

  const allTerms = [...REQUIRED_TERMS, ...OPTIONAL_TERMS];
  await admin.from("member_agreements").insert(
    allTerms.map((key) => ({
      member_id: signed.user!.id,
      term_key: key,
      agreed: data.terms.includes(key),
    })),
  );

  redirect("/signup/complete");
}

export async function login(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    loginId: String(formData.get("loginId") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  // proxy 가 보호 경로에서 돌려보냈다면 원래 가려던 곳으로 되돌린다.
  // 외부 도메인으로 튕기지 않도록 내부 경로만 허용한다.
  const nextRaw = String(formData.get("next") ?? "");
  const nextPath = nextRaw.startsWith("/") && !nextRaw.startsWith("//") ? nextRaw : "/mypage";
  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: { loginId: raw.loginId },
    };
  }

  // 로그인 식별자가 아이디라서 이메일을 먼저 찾는다. RLS 때문에 anon 으로는
  // 못 읽으므로 service role 을 쓴다.
  const admin = createAdminClient();
  const { data: member } = await admin
    .from("members")
    .select("email")
    .eq("login_id", parsed.data.loginId)
    .maybeSingle();

  // 아이디 존재 여부를 노출하지 않도록 실패 메시지를 하나로 통일한다.
  const failed: FormState = {
    message: "아이디 또는 비밀번호가 올바르지 않습니다.",
    values: { loginId: raw.loginId },
  };

  if (!member) return failed;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: member.email,
    password: parsed.data.password,
  });

  if (error) return failed;

  redirect(nextPath);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
