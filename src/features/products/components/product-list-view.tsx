import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/ui/product-card";
import type { ProductSummary } from "@/features/products/queries";

/**
 * 상품 진열 목록 — **Figma 시안 없음**.
 * GNB(node 277:6032)의 NEW/BEST/SALE/PRO/GenRang/SHOP 이 가리키던 경로들이다.
 * 메인의 상품 그리드(node 277:5257)에서 쓰는 ProductCard 와 5열 배치를 그대로 따랐고,
 * 좁은 화면에서는 2열로 접는다.
 */
export function ProductListView({
  title,
  description,
  products,
}: {
  title: string;
  description?: string;
  products: ProductSummary[];
}) {
  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      <Breadcrumb items={[{ label: "홈", href: "/" }, { label: title }]} />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="text-[24px] font-bold text-ink">{title}</h1>
            <span className="text-[14px] text-muted">{products.length}개</span>
          </div>
          {description && (
            <p className="text-[14px] text-muted">{description}</p>
          )}
        </div>

        {products.length === 0 ? (
          <EmptyState
            message="진열된 상품이 없습니다."
            action={{ label: "메인으로 가기", href: "/" }}
          />
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
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
    </Container>
  );
}
