import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";
import { listMemberReviews } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "상품후기 | Gen.G Online Store",
};

/**
 * 상품후기 — **Figma 시안 없음**.
 * 상품상세의 후기 카드(node 277:5753)를 목록 형태로 눕혀 재사용했다.
 */
export default async function MyPageReviewsPage() {
  const member = await getCurrentMember();
  if (!member) redirect("/login?next=/mypage/reviews");

  const [summary, reviews] = await Promise.all([
    getMemberSummary(member.id),
    listMemberReviews(member.id),
  ]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "상품후기" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/reviews">
        <section className="flex flex-col gap-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[16px] font-bold text-ink">상품후기</h2>
            <span className="text-[14px] text-muted">{reviews.length}건</span>
          </div>

          {reviews.length === 0 ? (
            <EmptyState
              message="작성한 상품후기가 없습니다."
              action={{ label: "주문/배송내역 보기", href: "/mypage/orders" }}
            />
          ) : (
            <ul className="flex flex-col border-t border-ink">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="flex flex-col gap-2 border-b border-line py-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={`/products/${review.productSlug}`}
                      className="text-[14px] font-bold text-ink hover:underline"
                    >
                      {review.productName}
                    </Link>
                    <span className="text-[13px] text-muted">
                      {review.createdAt.slice(0, 10).replace(/-/g, ".")}
                    </span>
                  </div>
                  {review.optionLabel && (
                    <p className="text-[13px] text-muted">
                      옵션 · {review.optionLabel}
                    </p>
                  )}
                  {review.title && (
                    <p className="text-[14px] font-medium text-ink">
                      {review.title}
                    </p>
                  )}
                  <p className="text-[14px] text-muted">{review.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </MyPageShell>
    </>
  );
}
