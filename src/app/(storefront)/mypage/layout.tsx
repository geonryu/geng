import { Container } from "@/components/layout/container";

/** 마이페이지 공통 여백 — node 277:6331 (브레드크럼 136 → 본문 203) */
export default function MyPageLayout(props: LayoutProps<"/mypage">) {
  return (
    <Container className="flex flex-col gap-[50px] py-5 lg:pt-[20px] lg:pb-[100px]">
      {props.children}
    </Container>
  );
}
