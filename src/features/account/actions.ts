"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  OPTIONAL_TERMS,
  REQUIRED_TERMS,
  birthDateOf,
  emailOf,
  addressSchema,
  findIdSchema,
  findPasswordSchema,
  loginSchema,
  phoneOf,
  profileSchema,
  signupSchema,
  type FormState,
} from "@/features/account/schemas";
import { getCurrentMember } from "@/features/account/queries";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_LOCALE, isLocale, localeHref, type Locale } from "@/i18n/config";

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

/**
 * 폼이 실어 보낸 로케일. Server Action 에서는 `next/root-params` 를 쓸 수 없어서
 * LocaleField 가 hidden 으로 넣어준 값을 읽는다. 없으면 기본 로케일로 본다.
 */
function localeOf(formData: FormData): Locale {
  const value = String(formData.get("locale") ?? "");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/**
 * Supabase 가 아직 연결되지 않았을 때 돌려줄 상태.
 * 환경변수가 없으면 createClient 가 throw 해 500 이 되므로 그 전에 막는다.
 */
const NOT_CONFIGURED: FormState = {
  message:
    "데이터베이스가 아직 연결되지 않았습니다. 잠시 후 다시 시도해주세요.",
};

/** 로케일을 유지한 내부 경로. */
function pathFor(locale: Locale, path: string) {
  return localeHref(locale, path);
}

/** 보호 경로에서 로그인으로 돌려보낼 때. */
function loginFor(locale: Locale, nextPath: string) {
  return `${localeHref(locale, "/login")}?next=${encodeURIComponent(localeHref(locale, nextPath))}`;
}

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
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

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

  redirect(pathFor(localeOf(formData), "/signup/complete"));
}

export async function login(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const raw = {
    loginId: String(formData.get("loginId") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  // proxy 가 보호 경로에서 돌려보냈다면 원래 가려던 곳으로 되돌린다.
  // 외부 도메인으로 튕기지 않도록 내부 경로만 허용한다.
  const nextRaw = String(formData.get("next") ?? "");
  const nextPath =
    nextRaw.startsWith("/") && !nextRaw.startsWith("//")
      ? nextRaw
      : pathFor(localeOf(formData), "/mypage");
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

export async function logout(formData: FormData) {
  if (!hasSupabaseEnv()) redirect(pathFor(localeOf(formData), "/"));

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(pathFor(localeOf(formData), "/"));
}

export async function updateProfile(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const member = await getCurrentMember();
  if (!member) redirect(loginFor(localeOf(formData), "/mypage/profile"));

  const raw = {
    name: String(formData.get("name") ?? ""),
    phonePrefix: String(formData.get("phonePrefix") ?? ""),
    phoneMid: String(formData.get("phoneMid") ?? ""),
    phoneLast: String(formData.get("phoneLast") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    address: String(formData.get("address") ?? ""),
    addressDetail: String(formData.get("addressDetail") ?? ""),
  };
  const parsed = profileSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: raw,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("members")
    .update({
      name: parsed.data.name,
      phone: phoneOf(parsed.data),
      postcode: parsed.data.postcode || null,
      address: parsed.data.address || null,
      address_detail: parsed.data.addressDetail || null,
    })
    .eq("id", member.id);

  if (error) {
    return { message: `저장에 실패했습니다. (${error.message})`, values: raw };
  }

  revalidatePath("/mypage/profile");
  revalidatePath("/mypage");
  return { message: "회원정보가 저장되었습니다." };
}

export async function addAddress(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const member = await getCurrentMember();
  if (!member) redirect(loginFor(localeOf(formData), "/mypage/addresses"));

  const raw = {
    label: String(formData.get("label") ?? ""),
    recipient: String(formData.get("recipient") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    postcode: String(formData.get("postcode") ?? ""),
    address: String(formData.get("address") ?? ""),
    addressDetail: String(formData.get("addressDetail") ?? ""),
    isDefault: formData.get("isDefault") === "on",
  };
  const parsed = addressSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: { ...raw, isDefault: String(raw.isDefault) },
    };
  }

  const supabase = await createClient();

  // 기본 배송지는 하나뿐이다(0001 의 부분 유니크 인덱스). 새로 지정하면 기존 것을 내린다.
  if (parsed.data.isDefault) {
    await supabase
      .from("member_addresses")
      .update({ is_default: false })
      .eq("member_id", member.id);
  }

  const { error } = await supabase.from("member_addresses").insert({
    member_id: member.id,
    label: parsed.data.label || null,
    recipient: parsed.data.recipient,
    phone: parsed.data.phone || null,
    postcode: parsed.data.postcode,
    address: parsed.data.address,
    address_detail: parsed.data.addressDetail || null,
    is_default: parsed.data.isDefault,
  });

  if (error) {
    return {
      message: `배송지 추가에 실패했습니다. (${error.message})`,
      values: { ...raw, isDefault: String(raw.isDefault) },
    };
  }

  revalidatePath("/mypage/addresses");
  return { message: "배송지가 추가되었습니다." };
}

export async function deleteAddress(formData: FormData) {
  if (!hasSupabaseEnv()) return;

  const member = await getCurrentMember();
  if (!member) redirect(loginFor(localeOf(formData), "/mypage/addresses"));

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = await createClient();
  // RLS 로도 막히지만 member_id 조건을 명시해 두 겹으로 건다.
  await supabase
    .from("member_addresses")
    .delete()
    .eq("id", id)
    .eq("member_id", member.id);

  revalidatePath("/mypage/addresses");
}

/**
 * 회원탈퇴 — 되돌릴 수 없다.
 *
 * auth 사용자를 지우면 members 가 on delete cascade 로 함께 지워지고,
 * member_agreements · member_addresses · carts · wishlists 도 연쇄로 정리된다.
 * unified_orders 는 member_id 가 null 로만 풀린다 — 주문 원본은 채널 소유라
 * 여기서 지우지 않는다 (AGENTS.md §1).
 */
export async function withdraw(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const member = await getCurrentMember();
  if (!member) redirect(pathFor(localeOf(formData), "/login"));

  const typed = String(formData.get("confirmLoginId") ?? "").trim();
  if (typed !== member.loginId) {
    return {
      errors: { confirmLoginId: ["아이디가 일치하지 않습니다."] },
    };
  }

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.deleteUser(member.id);

  if (error) {
    return { message: `탈퇴 처리에 실패했습니다. (${error.message})` };
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(pathFor(localeOf(formData), "/"));
}

/** 아이디 일부를 가린다. "kimgenrang" → "kimge*****" */
function maskLoginId(loginId: string) {
  const shown = Math.max(1, Math.ceil(loginId.length / 2));
  return loginId.slice(0, shown) + "*".repeat(loginId.length - shown);
}

export async function findId(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
  const parsed = findIdSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: raw,
    };
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("members")
    .select("login_id")
    .eq("name", parsed.data.name)
    .eq("email", parsed.data.email)
    .maybeSingle();

  if (!data) {
    return {
      message: "일치하는 회원 정보를 찾을 수 없습니다.",
      values: raw,
    };
  }

  // 전체 아이디를 그대로 노출하지 않는다.
  return {
    message: `회원님의 아이디는 ${maskLoginId(data.login_id)} 입니다.`,
    values: raw,
  };
}

export async function findPassword(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (!hasSupabaseEnv()) return NOT_CONFIGURED;

  const raw = {
    loginId: String(formData.get("loginId") ?? ""),
    email: String(formData.get("email") ?? ""),
  };
  const parsed = findPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      values: raw,
    };
  }

  const admin = createAdminClient();
  const { data } = await admin
    .from("members")
    .select("email")
    .eq("login_id", parsed.data.loginId)
    .eq("email", parsed.data.email)
    .maybeSingle();

  // 가입 여부가 드러나지 않도록 결과와 무관하게 같은 문구를 돌려준다.
  const sent: FormState = {
    message:
      "입력하신 정보가 확인되면 비밀번호 재설정 메일을 보내드립니다. 메일함을 확인해주세요.",
    values: raw,
  };

  if (!data) return sent;

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(data.email);
  return sent;
}
