import { cache } from "react";

import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

/**
 * 회원 조회 DAL (Data Access Layer).
 *
 * Next 16 인증 가이드의 권고대로, 보안 검사는 데이터에 가장 가까운 곳에서 한다.
 * proxy 의 리다이렉트는 낙관적 검사일 뿐이고 실제 권한 판단은 여기서 이뤄진다.
 *
 * `cache()` 로 감싸 한 요청 안에서 여러 컴포넌트가 불러도 질의는 한 번만 나간다.
 */

export type Member = {
  id: string;
  memberType: "personal" | "business" | "foreigner";
  loginId: string;
  name: string;
  email: string;
  birthDate: string | null;
  gender: "male" | "female" | null;
  phone: string | null;
  postcode: string | null;
  address: string | null;
  addressDetail: string | null;
};

/**
 * 현재 로그인한 회원. 비로그인이면 null.
 *
 * getUser() 는 매번 Auth 서버에 토큰을 검증시킨다 — getSession() 은 쿠키를
 * 그대로 믿기 때문에 서버에서 신뢰 판단에 쓰면 안 된다.
 */
export const getCurrentMember = cache(async (): Promise<Member | null> => {
  if (!hasSupabaseEnv()) return null;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("members")
    .select(
      "id, member_type, login_id, name, email, birth_date, gender, phone, postcode, address, address_detail",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!data) return null;

  return {
    id: data.id,
    memberType: data.member_type,
    loginId: data.login_id,
    name: data.name,
    email: data.email,
    birthDate: data.birth_date,
    gender: data.gender,
    phone: data.phone,
    postcode: data.postcode,
    address: data.address,
    addressDetail: data.address_detail,
  };
});

/** 로그인이 반드시 필요한 화면에서 쓴다. 비로그인이면 호출부가 리다이렉트한다. */
export async function requireMember() {
  const member = await getCurrentMember();
  if (!member) return null;
  return member;
}

/**
 * 마이페이지 요약 — node 277:6385 / 277:6449
 *
 * 주문 수치는 통합 주문 read-model(unified_orders)에서 센다. 적립금·예치금·쿠폰은
 * 아직 테이블이 없어 0 으로 둔다. 이 셋은 금전 잔액이라 "조회"는 Phase 1 이지만
 * 적립·차감 원장을 만드는 것은 결제·정산 영역(Phase 2)이다 — AGENTS.md §1.
 */
export type MemberSummary = {
  totalOrderAmount: number;
  orderCount: number;
  points: number;
  deposit: number;
  coupons: number;
  wishlistCount: number;
};

const EMPTY_SUMMARY: MemberSummary = {
  totalOrderAmount: 0,
  orderCount: 0,
  points: 0,
  deposit: 0,
  coupons: 0,
  wishlistCount: 0,
};

export const getMemberSummary = cache(
  async (memberId: string): Promise<MemberSummary> => {
    if (!hasSupabaseEnv()) return EMPTY_SUMMARY;

    const supabase = await createClient();

    const [orders, wishlist] = await Promise.all([
      supabase
        .from("unified_orders")
        .select("total_amount")
        .eq("member_id", memberId),
      supabase
        .from("wishlists")
        .select("product_id", { count: "exact", head: true })
        .eq("member_id", memberId),
    ]);

    const rows = orders.data ?? [];

    return {
      totalOrderAmount: rows.reduce((sum, row) => sum + row.total_amount, 0),
      orderCount: rows.length,
      points: 0,
      deposit: 0,
      coupons: 0,
      wishlistCount: wishlist.count ?? 0,
    };
  },
);

export type MemberAddress = {
  id: number;
  label: string | null;
  recipient: string;
  phone: string | null;
  postcode: string;
  address: string;
  addressDetail: string | null;
  isDefault: boolean;
};

/** 배송주소록 — 기본 배송지가 맨 위로 온다. */
export const listAddresses = cache(
  async (memberId: string): Promise<MemberAddress[]> => {
    if (!hasSupabaseEnv()) return [];

    const supabase = await createClient();
    const { data } = await supabase
      .from("member_addresses")
      .select("id, label, recipient, phone, postcode, address, address_detail, is_default")
      .eq("member_id", memberId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    return (data ?? []).map((row) => ({
      id: row.id,
      label: row.label,
      recipient: row.recipient,
      phone: row.phone,
      postcode: row.postcode,
      address: row.address,
      addressDetail: row.address_detail,
      isDefault: row.is_default,
    }));
  },
);

/**
 * 주문 상태별 건수 — node 277:6511 / 277:6752
 *
 * 통합 주문 read-model 에서 센다. 채널이 주는 상태 문자열이 제각각이라
 * 여기서 시안의 6개 칸으로 모은다. 매칭되지 않는 상태는 어느 칸에도 들어가지 않는다.
 */
export const ORDER_STATUS_KEYS = [
  "pending",
  "preparing",
  "shipping",
  "delivered",
  "cancelled",
  "claimed",
] as const;

export type OrderStatusKey = (typeof ORDER_STATUS_KEYS)[number];

/** 채널별 상태 문자열 → 시안의 칸. 연동이 붙으면 여기만 넓히면 된다. */
const STATUS_MAP: Record<string, OrderStatusKey> = {
  입금전: "pending",
  배송준비중: "preparing",
  배송중: "shipping",
  배송완료: "delivered",
  취소: "cancelled",
  "교환/반품": "claimed",
};

export const getOrderStatusCounts = cache(
  async (memberId: string): Promise<Record<OrderStatusKey, number>> => {
    const empty = Object.fromEntries(
      ORDER_STATUS_KEYS.map((key) => [key, 0]),
    ) as Record<OrderStatusKey, number>;

    if (!hasSupabaseEnv()) return empty;

    const supabase = await createClient();
    const { data } = await supabase
      .from("unified_orders")
      .select("status")
      .eq("member_id", memberId);

    for (const row of data ?? []) {
      const key = STATUS_MAP[row.status];
      if (key) empty[key] += 1;
    }
    return empty;
  },
);
