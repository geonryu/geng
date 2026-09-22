import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Accordion } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ProductDetailTabs } from "@/features/products/components/product-detail-tabs";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductPurchasePanel } from "@/features/products/components/product-purchase-panel";

import { PRODUCT_DETAILS } from "./product-detail-data";

/**
 * 상품상세 — Figma 최종화면 / 상품상세시안1_PC (node 277:5284), 상품상세_MO (node 290:13438)
 * PC는 550 갤러리 + 540 구매 패널 2단, MO는 세로 1단에 구매 버튼만 하단 고정이다.
 */
export default async function ProductDetailPage(
  props: PageProps<"/products/[slug]">,
) {
  const { slug } = await props.params;
  const product = PRODUCT_DETAILS[slug];

  if (!product) notFound();

  return (
    <div className="pb-24 lg:pb-0">
      {/* 브레드크럼 — MO는 옅은 띠 위에 올라간다 (node 290:13793) */}
      <div className="bg-surface-soft lg:bg-transparent">
        <Container className="py-2 lg:py-0 lg:pt-[20px]">
          <Breadcrumb items={product.breadcrumb} />
        </Container>
      </div>

      <Container className="px-0 lg:px-0 lg:pt-[50px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-[50px]">
          <ProductGallery images={product.gallery} />

          <div className="px-5 lg:px-0">
            <ProductPurchasePanel
              name={product.name}
              price={product.price}
              shippingNotice={product.shippingNotice}
              options={product.options}
            />
          </div>
        </div>
      </Container>

      <div className="mt-[50px] border-t border-line">
        <Container className="px-0 lg:px-0">
          <ProductDetailTabs product={product} />

          <div className="px-5 lg:px-0">
            <Accordion
              className="border-t-0"
              items={product.guides.map((guide) => ({
                id: guide.id,
                label: guide.label,
                content: <p>{guide.content}</p>,
              }))}
            />
          </div>
        </Container>
      </div>
    </div>
  );
}
