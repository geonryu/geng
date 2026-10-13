import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

/**
 * 상품 조회 DAL.
 *
 * 진열 데이터는 RLS 에서 공개 읽기이므로 anon 세션으로도 조회된다.
 * 마이그레이션 적용 전에는 테이블이 없어 error 가 돌아오는데, 화면이 죽지 않도록
 * 전부 빈 배열로 떨어뜨린다 (supabase-js 는 throw 하지 않고 {data:null,error} 를 준다).
 */

export type ProductSummary = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  thumbnailSrc: string | null;
};

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: number;
  original_price: number | null;
  thumbnail_src: string | null;
};

function toSummary(row: ProductRow): ProductSummary {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: row.price,
    originalPrice: row.original_price,
    thumbnailSrc: row.thumbnail_src,
  };
}

const SUMMARY_COLUMNS = "id, slug, name, price, original_price, thumbnail_src";

/** 진열 중인 상품 목록. */
export const listProducts = cache(
  async (limit = 20): Promise<ProductSummary[]> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("products")
      .select(SUMMARY_COLUMNS)
      .in("status", ["display", "on_sale"])
      .order("created_at", { ascending: false })
      .limit(limit);

    return (data ?? []).map(toSummary);
  },
);

/** 회원이 찜한 상품. */
export const listWishlistProducts = cache(
  async (memberId: string): Promise<ProductSummary[]> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("wishlists")
      .select(`product:products(${SUMMARY_COLUMNS})`)
      .eq("member_id", memberId)
      .order("created_at", { ascending: false });

    const rows = (data ?? []) as unknown as { product: ProductRow | null }[];
    return rows
      .map((row) => row.product)
      .filter((row): row is ProductRow => row !== null)
      .map(toSummary);
  },
);

export type MemberReview = {
  id: string;
  productName: string;
  productSlug: string;
  optionLabel: string | null;
  title: string | null;
  body: string;
  createdAt: string;
};

/** 회원이 쓴 상품후기 — 마이페이지 > 상품후기 */
export const listMemberReviews = cache(
  async (memberId: string): Promise<MemberReview[]> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("product_reviews")
      .select("id, option_label, title, body, created_at, product:products(name, slug)")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false });

    const rows = (data ?? []) as unknown as {
      id: string;
      option_label: string | null;
      title: string | null;
      body: string;
      created_at: string;
      product: { name: string; slug: string } | null;
    }[];

    return rows.map((row) => ({
      id: row.id,
      productName: row.product?.name ?? "삭제된 상품",
      productSlug: row.product?.slug ?? "",
      optionLabel: row.option_label,
      title: row.title,
      body: row.body,
      createdAt: row.created_at,
    }));
  },
);
