import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "SALE | Gen.G Online Store",
};

/** SALE — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function SalePage() {
  const products = await listProducts({ kind: "sale" });

  return (
    <ProductListView
      title="SALE"
      description="할인 중인 상품입니다."
      products={products}
    />
  );
}
