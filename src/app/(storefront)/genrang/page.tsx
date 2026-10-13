import type { Metadata } from "next";

import { ProductListView } from "@/features/products/components/product-list-view";
import { listProducts } from "@/features/products/queries";

export const metadata: Metadata = {
  title: "GenRang | Gen.G Online Store",
};

/** GenRang — **Figma 시안 없음**. GNB(node 277:6032)의 링크 대상. */
export default async function GenrangPage() {
  const products = await listProducts({ kind: "category", category: "genrang" });

  return (
    <ProductListView
      title="GenRang"
      description="마스코트 젠랑이 굿즈입니다."
      products={products}
    />
  );
}
