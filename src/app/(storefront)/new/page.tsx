import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "NEW | Gen.G Online Store",
};

/** NEW — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function NewPage() {
  const products = await listProducts({ kind: "new" });

  return (
    <ProductListView
      title="NEW"
      description="새로 들어온 상품을 최신 등록순으로 보여줍니다."
      products={products}
    />
  );
}
