import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "PRO | Gen.G Online Store",
};

/** PRO — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function ProPage() {
  const products = await listProducts({ kind: "category", category: "pro" });

  return (
    <ProductListView
      title="PRO"
      description="선수단이 착용하는 공식 프로킷입니다."
      products={products}
    />
  );
}
