import type { Metadata } from "next";
import { Accordion } from "@/components/ui/accordion";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGo } from "@/components/ui/button-go";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoStrip } from "@/components/ui/info-strip";
import { NoticeBox } from "@/components/ui/notice-box";
import { Price } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";
import { SelectField } from "@/components/ui/select-field";
import { SideNav } from "@/components/ui/side-nav";
import { StatCard } from "@/components/ui/stat-card";
import { SummaryBar } from "@/components/ui/summary-bar";
import { BoxField } from "@/components/ui/text-field";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CartIcon,
  GlobeIcon,
  LikeIcon,
  MyPageIcon,
  PauseIcon,
  PlayIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { LocaleBadge } from "@/components/ui/locale-badge";
import { Logo } from "@/components/ui/logo";
import { ProductCard } from "@/components/ui/product-card";
import { ReleaseCard, ReleaseTile } from "@/components/ui/release-card";
import { SearchField } from "@/components/ui/search-field";
import { SlideButton, SlideDots } from "@/components/ui/slide-controls";
import { Slogan } from "@/components/ui/slogan";
import { SubBanner, SubBannerWide } from "@/components/ui/sub-banner";
import { PillTabs, SegmentedTabs } from "@/components/ui/tabs";
import {
  InteractiveCheckbox,
  InteractiveQuantityStepper,
  InteractiveSegmentedToggle,
  InteractiveTextField,
  InteractiveSlideBar,
  InteractiveSlideControls,
  InteractiveTabs,
  InteractiveUnderlineTabs,
} from "./interactive";
import { Section, Specimen } from "./specimen";

export const metadata: Metadata = {
  title: "컴포넌트 | Gen.G Admin",
  description: "Figma 컴포넌트 모음 + 최종화면에서 도출한 디자인 시스템 카탈로그",
};

const NAV = [
  { id: "foundations", label: "Foundations" },
  { id: "logo", label: "Logo" },
  { id: "icons", label: "Icons" },
  { id: "slogan", label: "Slogan" },
  { id: "search", label: "Search" },
  { id: "buttons", label: "Button" },
  { id: "tabs", label: "Tabs" },
  { id: "slide", label: "Slide controls" },
  { id: "slide-bar", label: "Slide bar" },
  { id: "product", label: "Product" },
  { id: "release", label: "Release" },
  { id: "banner", label: "Sub banner" },
  { id: "breadcrumb", label: "Breadcrumb" },
  { id: "button", label: "Button (신규)" },
  { id: "form", label: "Form" },
  { id: "toggle", label: "Segmented toggle" },
  { id: "stepper", label: "Quantity" },
  { id: "price", label: "Price" },
  { id: "underline-tabs", label: "Underline tabs" },
  { id: "accordion", label: "Accordion" },
  { id: "notice", label: "Notice box" },
  { id: "summary", label: "Summary bar" },
  { id: "stat", label: "Stat card" },
  { id: "info-strip", label: "Info strip" },
  { id: "side-nav", label: "Side nav" },
];

const COLORS = [
  { token: "ink", value: "#151515", swatch: "bg-ink" },
  { token: "muted", value: "#666666", swatch: "bg-muted" },
  { token: "line", value: "#e5e5e5", swatch: "bg-line" },
  { token: "line-soft", value: "#efefef", swatch: "bg-line-soft" },
  { token: "surface-soft", value: "#f6f6f6", swatch: "bg-surface-soft" },
  { token: "control", value: "#d9d9d9", swatch: "bg-control" },
  { token: "on-dark-idle", value: "#eaeaea", swatch: "bg-on-dark-idle" },
  { token: "sale", value: "#ff8a56", swatch: "bg-sale" },
  { token: "geng-gold", value: "#d1b782", swatch: "bg-geng-gold" },
];

const RADII = [
  { token: "rounded-field", value: "5px", className: "rounded-field" },
  { token: "rounded-button", value: "8px", className: "rounded-button" },
  { token: "rounded-banner", value: "10px", className: "rounded-banner" },
  { token: "rounded-card", value: "15px", className: "rounded-card" },
  { token: "rounded-pill", value: "20px", className: "rounded-pill" },
];

const ICONS = [
  { name: "search", node: "148:1458", Icon: SearchIcon },
  { name: "cart", node: "148:1455", Icon: CartIcon },
  { name: "global", node: "148:1456", Icon: GlobeIcon },
  { name: "mypage", node: "148:1457", Icon: MyPageIcon },
  { name: "like", node: "148:1454", Icon: LikeIcon },
  { name: "arrow(L)", node: "148:1523", Icon: ArrowLeftIcon },
  { name: "arrow(R)", node: "148:1524", Icon: ArrowRightIcon },
  { name: "arrow(R_UP)", node: "148:2293", Icon: ArrowUpRightIcon },
  { name: "pause", node: "148:1526", Icon: PauseIcon },
  { name: "start", node: "148:1530", Icon: PlayIcon },
];

const CATEGORY_TABS = [
  { id: "pro-kit", label: "2026 PRO KIT" },
  { id: "cheering", label: "CHEERING GEAR" },
  { id: "genrang", label: "GENRANG" },
  { id: "collectibles", label: "COLLECTIBLES" },
];

const CURATION_TABS = [
  { id: "best", label: "BEST" },
  { id: "md", label: "MD’s PICK" },
  { id: "new", label: "NEW" },
];

export default function ComponentsPage() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="sticky top-0 z-10 border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 md:px-8 lg:px-gutter">
          <div className="flex items-center gap-3">
            <Logo className="size-9" />
            <div>
              <h1 className="text-[20px] font-bold text-ink">
                컴포넌트 카탈로그
              </h1>
              <p className="text-[13px] text-[#666]">
                Figma · 젠지온라인리뉴얼 — 컴포넌트 모음 (148:2668) + 최종화면 (277:5038)
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-[#666]">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-ink hover:underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 py-12 md:px-8 lg:px-gutter">
        <Section
          id="foundations"
          title="Foundations"
          node="tokens"
          description="Figma 파일에 Variable이 정의돼 있지 않아, 시안에서 반복되는 값을 globals.css의 @theme 토큰으로 승격했다. 이후 컴포넌트는 raw hex 대신 이 토큰만 사용한다."
        >
          <Specimen label="Color">
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {COLORS.map((color) => (
                <li key={color.token} className="flex flex-col gap-2">
                  <span
                    className={`h-16 w-full rounded-button border border-line ${color.swatch}`}
                  />
                  <span className="text-[13px] font-medium text-ink">
                    {color.token}
                  </span>
                  <span className="text-[12px] text-[#666]">{color.value}</span>
                </li>
              ))}
            </ul>
          </Specimen>

          <Specimen label="Radius">
            <ul className="flex flex-wrap gap-6">
              {RADII.map((radius) => (
                <li key={radius.token} className="flex flex-col gap-2">
                  <span
                    className={`size-20 border-2 border-ink ${radius.className}`}
                  />
                  <span className="text-[13px] font-medium text-ink">
                    {radius.token}
                  </span>
                  <span className="text-[12px] text-[#666]">
                    {radius.value}
                  </span>
                </li>
              ))}
            </ul>
          </Specimen>
        </Section>

        <Section
          id="logo"
          title="Logo"
          node="66:49"
          description="Default(골드) / White / Black 세 variant. 단일 SVG에 currentColor를 물려 tone prop으로 전환한다."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Specimen label="Default · Black">
              <div className="flex items-center gap-8">
                <Logo tone="default" />
                <Logo tone="black" />
              </div>
            </Specimen>
            <Specimen label="White (dark surface)" dark>
              <Logo tone="white" />
            </Specimen>
          </div>
        </Section>

        <Section
          id="icons"
          title="Icons"
          node="148:2727 외"
          description="시안의 Default(#151515) / Variant2(white)는 색 차이뿐이라 currentColor 하나로 통합했다. 크기는 24px 기본, className으로 조정한다."
        >
          <Specimen label="Light surface">
            <ul className="grid grid-cols-3 gap-6 sm:grid-cols-5">
              {ICONS.map(({ name, node, Icon }) => (
                <li
                  key={name}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Icon className="text-ink" />
                  <span className="text-[12px] font-medium text-ink">
                    {name}
                  </span>
                  <span className="text-[11px] text-[#999]">{node}</span>
                </li>
              ))}
            </ul>
          </Specimen>

          <Specimen label="Dark surface + LocaleBadge (148:2774)" dark>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <SearchIcon />
              <CartIcon />
              <MyPageIcon />
              <LikeIcon />
              <GlobeIcon />
              <LocaleBadge />
            </div>
          </Specimen>
        </Section>

        <Section
          id="slogan"
          title="Slogan"
          node="148:1460"
          description="헤더 최상단 고정 바. 좁은 화면에서는 두 문구가 줄바꿈되도록 flex-wrap 처리했다."
        >
          <Specimen label="Full width" className="p-0">
            <Slogan />
          </Specimen>
        </Section>

        <Section
          id="search"
          title="Search field"
          node="148:1462"
          description="시안 236px 고정폭을 max-width로 바꿔 좁은 헤더에서도 줄어들게 했다."
        >
          <Specimen label="Default">
            <SearchField className="max-w-[236px]" />
          </Specimen>
        </Section>

        <Section
          id="buttons"
          title="Button (BUTTON_go)"
          node="148:2896"
          description="Default / 화살표 / 화이트+화살표 3 variant를 tone · withArrow 조합으로 표현한다."
        >
          <Specimen label="On light surface">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonGo />
              <ButtonGo withArrow />
            </div>
          </Specimen>
          <Specimen label="On dark surface (Variant3)" dark>
            <ButtonGo tone="light" withArrow />
          </Specimen>
        </Section>

        <Section
          id="tabs"
          title="Tabs"
          node="148:2268 · 148:1963 · 148:2999"
          description="TAP_ver1은 3분할·4분할이 같은 구조라 items 개수로 일반화한 SegmentedTabs 하나로 통합했다. 1340px 고정폭 대신 컨테이너를 균등 분할한다."
        >
          <Specimen label="SegmentedTabs — 4분할, 활성 위치별 (TAP_ver1_4ae)">
            <div className="flex flex-col gap-4">
              {CATEGORY_TABS.map((tab) => (
                <SegmentedTabs
                  key={tab.id}
                  items={CATEGORY_TABS}
                  activeId={tab.id}
                />
              ))}
            </div>
          </Specimen>

          <Specimen label="SegmentedTabs — 3분할 (TAP_ver1_3ae)">
            <div className="flex flex-col gap-4">
              {CURATION_TABS.map((tab) => (
                <SegmentedTabs
                  key={tab.id}
                  items={CURATION_TABS}
                  activeId={tab.id}
                />
              ))}
            </div>
          </Specimen>

          <Specimen label="PillTabs (TAP_ver2)">
            <PillTabs items={CATEGORY_TABS} activeId="pro-kit" />
          </Specimen>

          <Specimen label="동작 확인">
            <InteractiveTabs />
          </Specimen>
        </Section>

        <Section
          id="slide"
          title="Slide controls"
          node="148:2057 · 148:2074 · 148:2247"
          description="BUTTON_slide는 Large(45px) / Small(24px) × none·active 조합이다. 인디케이터 dot은 7px, 간격 8px."
        >
          <Specimen label="Large / Small × none · active">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <SlideButton direction="left" />
                <SlideButton direction="right" />
              </div>
              <div className="flex items-center gap-3">
                <SlideButton direction="left" active />
                <SlideButton direction="right" active />
              </div>
              <div className="flex items-center gap-3">
                <SlideButton direction="left" size="small" />
                <SlideButton direction="right" size="small" />
              </div>
              <div className="flex items-center gap-3">
                <SlideButton direction="left" size="small" active />
                <SlideButton direction="right" size="small" active />
              </div>
            </div>
          </Specimen>

          <Specimen label="SlideDots">
            <div className="flex items-center gap-8">
              <SlideDots count={2} activeIndex={0} />
              <SlideDots count={3} activeIndex={1} />
            </div>
          </Specimen>

          <Specimen label="동작 확인 (BannerControls 포함)">
            <InteractiveSlideControls />
          </Specimen>
        </Section>

        <Section
          id="slide-bar"
          title="Slide bar"
          node="148:2892"
          description="메인시안2의 풀블리드 배너 하단 인디케이터. 어두운 배경 전용이며, 시안의 4열 배치를 좁은 화면에서 2열 → 1열로 접는다."
        >
          <Specimen label="Default · Variant2" dark>
            <InteractiveSlideBar />
          </Specimen>
        </Section>

        <Section
          id="product"
          title="Product card"
          node="148:2087"
          description="Default / 2line/default / 1line/sale / 2line/sale 네 variant를 titleLines + sale 조합으로 표현한다. 244px 고정폭 대신 그리드 셀을 채우고 이미지는 1:1 비율을 유지한다."
        >
          <Specimen label="4 variants">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Jacket"
                title="2026 2nd Official Player Jacket"
                price={189000}
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Self Marking Kit (LOL)"
                title="2026 2nd Official Player Self Marking Kit (LOL)"
                price={189000}
                titleLines={2}
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Jacket"
                title="2026 2nd Official Player Jacket"
                price={94500}
                sale={{ originalPrice: 189000 }}
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Self Marking Kit (LOL)"
                title="2026 2nd Official Player Self Marking Kit (LOL)"
                price={94500}
                titleLines={2}
                sale={{ originalPrice: 189000 }}
              />
            </div>
          </Specimen>
        </Section>

        <Section
          id="release"
          title="Release"
          node="148:1773 · 148:2952"
          description="ver1은 메인시안1의 가로형 소식 카드, ver2는 메인시안2의 정사각 타일이다. ver2의 hover 오버레이는 group-hover로 구현했다."
        >
          <Specimen label="ReleaseCard (ver1)">
            <div className="grid gap-4 lg:grid-cols-3">
              <ReleaseCard
                imageSrc="/assets/images/release-uniform.png"
                label="2026 1st Official Uniform"
                title="키링 증정 이벤트 진행중!"
              />
              <ReleaseCard
                imageSrc="/assets/images/release-uniform.png"
                label="GenRang merch"
                title="마스코트 젠랑이 아이템"
              />
              <ReleaseCard
                imageSrc="/assets/images/release-uniform.png"
                label="2026 Membership"
                title="멤버십 구경하러 가기"
              />
            </div>
          </Specimen>

          <Specimen label="ReleaseTile (ver2) — 마우스를 올리면 오버레이가 나타난다">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[0, 1, 2, 3].map((index) => (
                <ReleaseTile
                  key={index}
                  imageSrc="/assets/images/release-jersey.png"
                  title="2026 1st Official Uniform"
                  description="키링 증정 이벤트 진행중!"
                />
              ))}
            </div>
          </Specimen>
        </Section>

        <Section
          id="banner"
          title="Sub banner"
          node="148:2302 · 148:3161"
          description="ver1은 카드형(이미지 + 우측 타이틀/화살표), ver2는 와이드 이미지형이다. ver2의 Variant2는 캐러셀에서 비활성 슬라이드를 딤 처리하는 상태다."
        >
          <Specimen label="SubBanner (ver1)">
            <div className="grid gap-6 xl:grid-cols-2">
              <SubBanner
                imageSrc="/assets/images/genrang-banner.png"
                imageAlt="GO TO GenRang"
                title="GO TO GenRang"
              />
              <SubBanner
                imageSrc="/assets/images/genrang-banner.png"
                imageAlt="GEN.G’S SLOGAN"
                title="GEN.G’S SLOGAN"
              />
            </div>
          </Specimen>

          <Specimen label="SubBannerWide (ver2) — Default · Variant2(dimmed)">
            <div className="grid gap-6 lg:grid-cols-2">
              <SubBannerWide
                imageSrc="/assets/images/genrang-wide.png"
                imageAlt="GO TO GenRang"
              />
              <SubBannerWide
                imageSrc="/assets/images/genrang-wide.png"
                imageAlt="GO TO GenRang"
                dimmed
              />
            </div>
          </Specimen>
        </Section>

        {/* ── 최종화면(node 277:5038)에서 추가된 컴포넌트 ─────────────────── */}

        <Section
          id="breadcrumb"
          title="Breadcrumb"
          node="277:6073 · 277:6075"
          description="최종화면 전 페이지 공통. 14px muted 텍스트에 16px export 셰브런을 끼운다. 시안은 마지막 항목도 muted라 현재 위치를 색으로 강조하지 않는다."
        >
          <Specimen label="2단계 · 3단계">
            <div className="flex flex-col gap-4">
              <Breadcrumb items={[{ label: "홈", href: "/" }, { label: "로그인" }]} />
              <Breadcrumb
                items={[
                  { label: "홈", href: "/" },
                  { label: "Pro Kit", href: "/pro" },
                  { label: "2026 Pro Kit" },
                ]}
              />
            </div>
          </Specimen>
        </Section>

        <Section
          id="button"
          title="Button (신규 체계)"
          node="277:7642 · 277:7699 · 277:7761~7765 · 277:6090"
          description="최종화면에는 버튼이 Figma 컴포넌트로 묶여 있지 않아 화면에서 역으로 도출했다. tone 4종 × size 3종 조합이며, 기존 ButtonGo(148:2896)는 메인 배너 전용으로 남는다."
        >
          <Specimen label="size sm (30px) — 표·목록 안의 보조 동작">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" tone="solid">주문하기</Button>
              <Button size="sm" tone="outline">찜하기</Button>
              <Button size="sm" tone="outline">상품 추가하기</Button>
              <Button size="sm" tone="muted">선택 상품 삭제</Button>
            </div>
          </Specimen>

          <Specimen label="size md (45px) — 페이지 하단 주요 동작">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="md" tone="outline" className="w-[267px]">계속 쇼핑하기</Button>
              <Button size="md" tone="outline-strong" className="w-[267px]">선택상품 주문하기</Button>
              <Button size="md" tone="solid" className="w-[267px]">전체상품 주문하기</Button>
            </div>
          </Specimen>

          <Specimen label="size lg (45px / 16px bold) — 폼 제출">
            <div className="flex max-w-[550px] flex-col gap-4">
              <Button size="lg" tone="muted" fullWidth>로그인 (비활성)</Button>
              <Button size="lg" tone="solid" fullWidth>로그인</Button>
            </div>
          </Specimen>
        </Section>

        <Section
          id="form"
          title="Form fields"
          node="277:6086 · 277:8649 · 257:1234 · 257:1247"
          description="언더라인 입력(TextField)·셀렉트(SelectField)·체크박스(Checkbox) 세 가지다. check01(원형)과 check02(사각)은 모서리만 다르고 체크 글리프를 공유해 shape prop 하나로 합쳤다."
        >
          <Specimen label="TextField — 언더라인 45px · 플로팅 라벨 (입력해 보세요)">
            <InteractiveTextField />
          </Specimen>

          <Specimen label="BoxField — 45px 박스 (회원가입 폼)">
            <div className="flex max-w-[550px] flex-col gap-4">
              <BoxField placeholder="ID (영문소문자/숫자, 4~16자)" aria-label="아이디" />
              <BoxField placeholder="이름 입력" aria-label="이름" />
            </div>
          </Specimen>

          <Specimen label="SelectField — 상품 옵션">
            <div className="max-w-[540px]">
              <SelectField aria-label="옵션 선택" defaultValue="">
                <option value="">- [필수] 옵션을 선택해주세요 -</option>
                <option value="m">M</option>
                <option value="l">L</option>
              </SelectField>
            </div>
          </Specimen>

          <Specimen label="Checkbox — active · deactive">
            <div className="flex items-center gap-8">
              <Checkbox shape="square" checked readOnly />
              <Checkbox shape="square" readOnly />
              <Checkbox shape="circle" checked readOnly />
              <Checkbox shape="circle" readOnly />
            </div>
          </Specimen>

          <Specimen label="동작 확인">
            <InteractiveCheckbox />
          </Specimen>
        </Section>

        <Section
          id="toggle"
          title="Segmented toggle"
          node="277:6080 · 277:7624"
          description="2분할 45px 박스. 기존 SegmentedTabs(TAP_ver1)와 달리 바깥 모서리에만 5px 라운드를 주고 비활성 칸에 line 테두리를 남긴다."
        >
          <Specimen label="회원/비회원 · 국내배송/해외배송">
            <div className="flex max-w-[570px] flex-col gap-6">
              <SegmentedToggle
                items={[
                  { id: "member", label: "회원" },
                  { id: "guest", label: "비회원" },
                ]}
                activeId="member"
              />
              <SegmentedToggle
                items={[
                  { id: "domestic", label: "국내배송", suffix: "(1)" },
                  { id: "overseas", label: "해외배송", suffix: "(0)" },
                ]}
                activeId="domestic"
              />
            </div>
          </Specimen>

          <Specimen label="동작 확인">
            <InteractiveSegmentedToggle />
          </Specimen>
        </Section>

        <Section
          id="stepper"
          title="Quantity stepper"
          node="277:7676 · 277:8663"
          description="30px 정사각 3칸. 가운데 칸은 좌우 테두리를 빼 이음매가 겹치지 않게 했다. 장바구니와 상품상세 옵션이 같은 컴포넌트를 쓴다."
        >
          <Specimen label="기본 · 최소 수량 도달">
            <div className="flex items-center gap-8">
              <QuantityStepper value={1} />
              <QuantityStepper value={3} />
            </div>
          </Specimen>

          <Specimen label="동작 확인">
            <InteractiveQuantityStepper />
          </Specimen>
        </Section>

        <Section
          id="price"
          title="Price"
          node="277:7670 · 277:8636"
          description="시안은 숫자만 Bold, 단위는 한 단계 작은 Regular로 쓴다. 기존 ProductCard 안에 묶여 있던 표기를 꺼내 장바구니·상품상세가 함께 쓰도록 분리했다."
        >
          <Specimen label="sm · md · lg / 할인 표기">
            <div className="flex flex-wrap items-end gap-12">
              <Price amount={16200} size="sm" />
              <Price amount={189000} size="md" />
              <Price amount={189000} size="lg" />
              <Price
                amount={16200}
                originalAmount={18000}
                size="sm"
                align="center"
              />
            </div>
          </Specimen>
        </Section>

        <Section
          id="underline-tabs"
          title="Underline tabs"
          node="277:8600 · 277:5420"
          description="상품상세의 상품설명 · 상품후기 · Q&A. 칸은 균등 분할하되 밑줄은 활성 라벨 폭만큼만 긋는다."
        >
          <Specimen label="동작 확인">
            <InteractiveUnderlineTabs />
          </Specimen>
        </Section>

        <Section
          id="accordion"
          title="Accordion"
          node="277:8617 · 277:8622 · 277:8627"
          description="상품상세 하단 안내. 63px 행에 라벨과 셰브런을 양 끝으로 둔다. 시안에는 닫힌 상태만 있어 열린 상태는 같은 리듬으로 이어 붙였다."
        >
          <Specimen label="기본 (첫 항목 열림)">
            <Accordion
              defaultOpenId="delivery"
              items={[
                {
                  id: "delivery",
                  label: "배송안내",
                  content: "배송비 3,000원 · 70,000원 이상 구매 시 무료배송입니다.",
                },
                { id: "exchange", label: "교환/반품 안내", content: "수령 후 7일 이내 신청 가능합니다." },
                { id: "guide", label: "이용안내", content: "상품 이용 관련 안내가 들어간다." },
              ]}
            />
          </Specimen>
        </Section>

        <Section
          id="notice"
          title="Notice box"
          node="277:7767"
          description="surface-soft 배경 · 24px 패딩의 회색 안내 박스. 제목 14px Bold, 항목 13px에 ∙ 불릿을 붙인다."
        >
          <Specimen label="장바구니 이용안내">
            <NoticeBox
              title="장바구니 이용안내"
              items={[
                "장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나 관심상품으로 등록하실 수 있습니다.",
                "해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니 별로 따로 결제해 주시기 바랍니다.",
                "해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송 장바구니로 이동하여 결제하실 수 있습니다.",
              ]}
            />
          </Specimen>
        </Section>

        <Section
          id="summary"
          title="Summary bar"
          node="277:7730"
          description="ink 테두리 한 겹 안에 3칸을 두고, 칸 경계 위에 45px 원형 기호(+, =)를 겹친다. 시안의 1140px 고정폭 대신 칸을 균등 분할했다."
        >
          <Specimen label="장바구니 합계">
            <SummaryBar
              cells={[
                { label: "상품 총 금액", amount: "16,200" },
                { label: "배송비", amount: "3,000" },
                { label: "결제 예정 금액", amount: "19,200", emphasis: true },
              ]}
            />
          </Specimen>
        </Section>

        <Section
          id="stat"
          title="Stat card"
          node="277:6450 · 277:6465 · 277:6478"
          description="마이페이지 요약 카드. 아이콘이 ink + sale 2톤이라 currentColor로 열 수 없어 export SVG를 public/assets/icons에 커밋해 그대로 쓴다."
        >
          <Specimen label="총주문 · 쿠폰 · 총적립금">
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                iconSrc="/assets/icons/stat-orders.svg"
                title="총주문"
                values={[
                  { amount: "0", unit: "원" },
                  { amount: "0", unit: "회" },
                ]}
              />
              <StatCard
                iconSrc="/assets/icons/stat-coupon.svg"
                title="쿠폰"
                values={[{ amount: "0", unit: "장" }]}
              />
              <StatCard
                iconSrc="/assets/icons/stat-points.svg"
                title="총적립금"
                values={[{ amount: "0", unit: "원" }]}
              />
            </div>
          </Specimen>
        </Section>

        <Section
          id="info-strip"
          title="Info strip"
          node="277:6492 · 277:6511"
          description="line 테두리 한 겹에 98px 칸을 균등 분할한 가로 띠. 적립금 요약과 주문 상태 카운트가 제목/값 순서만 다르게 쓰므로 reverse prop으로 흡수했다."
        >
          <Specimen label="기본 — 제목이 위">
            <InfoStrip
              cells={[
                { label: "가용적립금", value: "0원" },
                { label: "사용적립금", value: "0원" },
                { label: "예치금", value: "0원" },
              ]}
            />
          </Specimen>

          <Specimen label="reverse — 값이 위 (주문 상태 카운트)">
            <InfoStrip
              reverse
              cells={[
                { label: "입금전", value: "0" },
                { label: "배송준비중", value: "0" },
                { label: "배송중", value: "0" },
                { label: "배송완료", value: "0" },
                { label: "취소", value: "0" },
                { label: "교환/반품", value: "0" },
              ]}
            />
          </Specimen>
        </Section>

        <Section
          id="side-nav"
          title="Side nav"
          node="277:6383 · 277:6420 · 277:6433"
          description="마이페이지 좌측 250px 메뉴. 그룹 제목 16px Bold + 셰브런, 항목 14px에 12px 간격이다. 시안은 모든 그룹이 펼쳐진 상태이며 셰브런은 접기 어포던스다."
        >
          <Specimen label="쇼핑정보 카드 + 2개 그룹">
            <div className="max-w-[250px]">
              <SideNav
                activeHref="/mypage/orders"
                groups={[
                  {
                    id: "personal",
                    title: "개인정보",
                    items: [
                      { label: "회원정보 수정", href: "/mypage/profile" },
                      { label: "환불계좌관리", href: "/mypage/refund-account" },
                      { label: "배송주소록 관리", href: "/mypage/addresses" },
                      { label: "회원탈퇴", href: "/mypage/withdraw" },
                    ],
                  },
                  {
                    id: "shopping",
                    title: "쇼핑정보",
                    items: [
                      { label: "주문/배송내역", href: "/mypage/orders" },
                      { label: "취소/반품/교환 내역", href: "/mypage/claims" },
                      { label: "나의 적립금", href: "/mypage/points" },
                      { label: "할인쿠폰", href: "/mypage/coupons" },
                      { label: "찜한상품", href: "/mypage/wishlist" },
                      { label: "상품후기", href: "/mypage/reviews" },
                      { label: "최근 본 상품", href: "/mypage/recent" },
                    ],
                  },
                ]}
              >
                <div className="rounded-field bg-surface-soft px-5 py-6">
                  <p className="text-center text-[16px] text-ink">
                    <span className="font-bold">김젠랑</span>님의 쇼핑정보
                  </p>
                </div>
              </SideNav>
            </div>
          </Specimen>
        </Section>
      </main>
    </div>
  );
}
