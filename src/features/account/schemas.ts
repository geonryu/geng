import * as z from "zod";

/**
 * 회원 입력 검증 — Figma 최종화면 / 회원가입시안1_PC (node 277:7805), 로그인시안2_PC (node 277:6028)
 *
 * 지금까지 규칙은 입력란 placeholder 에만 글로 적혀 있고 실제 검증은 없었다
 * ("ID (영문소문자/숫자, 4~16자)", "비밀번호 … 10자~16자").
 * 그 문구를 그대로 스키마로 옮긴다. 검증은 서버 액션에서 수행한다 —
 * 클라이언트 검증만으로는 신뢰할 수 없다.
 */

export const MEMBER_TYPES = ["personal", "business", "foreigner"] as const;
export const GENDERS = ["male", "female"] as const;

/** 필수 약관. 둘 다 동의해야 가입된다. */
export const REQUIRED_TERMS = ["service", "privacy"] as const;
export const OPTIONAL_TERMS = ["marketing", "sms", "email"] as const;

const loginId = z
  .string()
  .trim()
  .regex(/^[a-z0-9]{4,16}$/, {
    error: "아이디는 영문소문자와 숫자로 4~16자여야 합니다.",
  });

/** 영문 대소문자 / 숫자 / 특수문자 중 2가지 이상 조합, 10~16자 */
const password = z
  .string()
  .min(10, { error: "비밀번호는 10자 이상이어야 합니다." })
  .max(16, { error: "비밀번호는 16자 이하여야 합니다." })
  .refine(
    (value) => {
      const kinds = [/[a-zA-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((re) =>
        re.test(value),
      ).length;
      return kinds >= 2;
    },
    { error: "영문·숫자·특수문자 중 2가지 이상을 섞어야 합니다." },
  );

export const signupSchema = z
  .object({
    memberType: z.enum(MEMBER_TYPES, { error: "회원구분을 선택해주세요." }),

    emailLocal: z.string().trim().min(1, { error: "이메일을 입력해주세요." }),
    emailDomain: z
      .string()
      .trim()
      .min(1, { error: "이메일 도메인을 선택해주세요." }),

    loginId,
    password,
    passwordConfirm: z.string(),

    name: z.string().trim().min(1, { error: "이름을 입력해주세요." }),

    birthYear: z.string().trim().min(1, { error: "생년월일을 선택해주세요." }),
    birthMonth: z.string().trim().min(1, { error: "생년월일을 선택해주세요." }),
    birthDay: z.string().trim().min(1, { error: "생년월일을 선택해주세요." }),
    gender: z.enum(GENDERS).optional(),

    postcode: z.string().trim().optional(),
    address: z.string().trim().optional(),
    addressDetail: z.string().trim().optional(),

    phonePrefix: z.string().trim().optional(),
    phoneMid: z.string().trim().optional(),
    phoneLast: z.string().trim().optional(),

    // 체크된 약관 키 목록. 필수 2종이 모두 들어 있어야 한다.
    terms: z.array(z.string()).default([]),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  })
  .refine((data) => z.email().safeParse(emailOf(data)).success, {
    error: "올바른 이메일 형식이 아닙니다.",
    path: ["emailLocal"],
  })
  .refine((data) => REQUIRED_TERMS.every((key) => data.terms.includes(key)), {
    error: "필수 약관에 동의해야 가입할 수 있습니다.",
    path: ["terms"],
  })
  .refine((data) => isRealDate(data.birthYear, data.birthMonth, data.birthDay), {
    error: "존재하지 않는 날짜입니다.",
    path: ["birthDay"],
  });

export const loginSchema = z.object({
  loginId: z.string().trim().min(1, { error: "아이디를 입력해주세요." }),
  password: z.string().min(1, { error: "비밀번호를 입력해주세요." }),
});

export type SignupInput = z.infer<typeof signupSchema>;

/** 폼 액션의 반환 모양. useActionState 가 그대로 받는다. */
export type FormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
      /** 입력값 되돌려주기 — 실패 시 사용자가 다시 타이핑하지 않도록 */
      values?: Record<string, string>;
    }
  | undefined;

/** 분리 입력된 이메일을 합친다. */
export function emailOf(data: { emailLocal: string; emailDomain: string }) {
  return `${data.emailLocal}@${data.emailDomain}`;
}

/** 분리 입력된 휴대폰 번호를 하이픈 없이 합친다. 비어 있으면 null. */
export function phoneOf(data: {
  phonePrefix?: string;
  phoneMid?: string;
  phoneLast?: string;
}) {
  const { phonePrefix, phoneMid, phoneLast } = data;
  if (!phonePrefix || !phoneMid || !phoneLast) return null;
  return `${phonePrefix}${phoneMid}${phoneLast}`;
}

/** YYYY-MM-DD 로 합친다. */
export function birthDateOf(data: {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}) {
  const month = data.birthMonth.padStart(2, "0");
  const day = data.birthDay.padStart(2, "0");
  return `${data.birthYear}-${month}-${day}`;
}

/** 2월 30일 같은 입력을 걸러낸다. */
function isRealDate(year: string, month: string, day: string) {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  if (!y || !m || !d) return false;
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
  );
}

/** 회원정보 수정 — 아이디·이메일은 식별자라 여기서 바꾸지 않는다. */
export const profileSchema = z.object({
  name: z.string().trim().min(1, { error: "이름을 입력해주세요." }),
  phonePrefix: z.string().trim().optional(),
  phoneMid: z.string().trim().optional(),
  phoneLast: z.string().trim().optional(),
  postcode: z.string().trim().optional(),
  address: z.string().trim().optional(),
  addressDetail: z.string().trim().optional(),
});

/** 배송지 추가 */
export const addressSchema = z.object({
  label: z.string().trim().optional(),
  recipient: z.string().trim().min(1, { error: "받는 분을 입력해주세요." }),
  phone: z.string().trim().optional(),
  postcode: z.string().trim().min(1, { error: "우편번호를 입력해주세요." }),
  address: z.string().trim().min(1, { error: "주소를 입력해주세요." }),
  addressDetail: z.string().trim().optional(),
  isDefault: z.boolean().default(false),
});

/** 아이디 찾기 — 가입 시 쓴 이름 + 이메일로 조회한다. */
export const findIdSchema = z.object({
  name: z.string().trim().min(1, { error: "이름을 입력해주세요." }),
  email: z.email({ error: "올바른 이메일 형식이 아닙니다." }),
});

/** 비밀번호 찾기 — 아이디 + 이메일이 모두 맞아야 재설정 메일을 보낸다. */
export const findPasswordSchema = z.object({
  loginId: z.string().trim().min(1, { error: "아이디를 입력해주세요." }),
  email: z.email({ error: "올바른 이메일 형식이 아닙니다." }),
});
