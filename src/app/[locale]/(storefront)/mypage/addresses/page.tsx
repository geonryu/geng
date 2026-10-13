import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AddressManager } from "@/features/account/components/address-manager";
import { MyPageShell } from "@/features/account/components/mypage-shell";
import {
  getCurrentMember,
  getMemberSummary,
  listAddresses,
} from "@/features/account/queries";
import { loginPath } from "@/i18n/server";

export const metadata: Metadata = {
  title: "배송주소록 관리 | Gen.G Online Store",
};

/** 배송주소록 관리 — **Figma 시안 없음**. 회원가입의 주소 입력 구성을 확장했다. */
export default async function MyPageAddressesPage() {
  const member = await getCurrentMember();
  if (!member) redirect(await loginPath("/mypage/addresses"));

  const [summary, addresses] = await Promise.all([
    getMemberSummary(member.id),
    listAddresses(member.id),
  ]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "홈", href: "/" },
          { label: "마이페이지", href: "/mypage" },
          { label: "배송주소록 관리" },
        ]}
      />

      <MyPageShell member={member} summary={summary} activeHref="/mypage/addresses">
        <AddressManager addresses={addresses} />
      </MyPageShell>
    </>
  );
}
