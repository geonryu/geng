import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "SHOP | Gen.G Online Store",
};

/** SHOP — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function ShopPage() {
  const products = await listProducts({ kind: "all" });

  return (
    <ProductListView
      title="SHOP"
      description="젠지 온라인 스토어의 전체 상품입니다."
      products={products}
    />
  );
}
