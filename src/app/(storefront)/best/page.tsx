import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "BEST | Gen.G Online Store",
};

/** BEST — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function BestPage() {
  const products = await listProducts({ kind: "best" });

  return (
    <ProductListView
      title="BEST"
      description="가장 많이 찾는 상품입니다."
      products={products}
    />
  );
}
