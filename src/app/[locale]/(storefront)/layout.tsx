import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentMember } from "@/features/account/queries";

export default async function StorefrontLayout(
  props: LayoutProps<"/[locale]">,
) {
  // 헤더가 로그인/로그아웃을 올바르게 보여주려면 세션을 알아야 한다.
  const member = await getCurrentMember();

  return (
    <>
      <SiteHeader memberName={member?.name ?? null} />
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </>
  );
}
