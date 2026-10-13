import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/ui/product-card";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import { getCurrentMember, getMemberSummary } from "@/features/account/queries";
import { listWishlistProducts } from "@/features/products/queries";
import { loginPath } from "@/i18n/server";

export const metadata: Metadata = {
  title: "찜한상품 | Gen.G Online Store",
};

/**
 * 찜한상품 — **Figma 시안 없음**.
 * 마이페이지(node 277:6565)의 "찜한 상품 더보기"가 가리키는 화면이다.
 * 메인의 상품 그리드(node 277:5257)에서 쓰는 ProductCard 를 그대로 재사용했다.
 */
export default async function MyPageWishlistPage() {
  const member = await getCurrentMember();
  if (!member) redirect(await loginPath("/mypage/wishlist"));

  const [summary, products] = await Promise.all([
    getMemberSummary(member.id),
    listWishlistProducts(member.id),
  ]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "찜한상품" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/wishlist">
        <section className="flex flex-col gap-5">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[16px] font-bold text-ink">찜한상품</h2>
            <span className="text-[14px] text-muted">{products.length}개</span>
          </div>

          {products.length === 0 ? (
            <EmptyState
              message="찜한 상품이 없습니다."
              action={{ label: "쇼핑하러 가기", href: "/" }}
            />
          ) : (
            <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard
                    imageSrc={product.thumbnailSrc ?? "/assets/icons/empty-state.svg"}
                    imageAlt={product.name}
                    title={product.name}
                    price={product.price}
                    href={`/products/${product.slug}`}
                    titleLines={2}
                    sale={
                      product.originalPrice
                        ? { originalPrice: product.originalPrice }
                        : undefined
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </MyPageShell>
    </>
  );
}
