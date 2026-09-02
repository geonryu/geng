import type { Metadata } from "next";
import { ButtonGo } from "@/components/ui/button-go";
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
  InteractiveSlideBar,
  InteractiveSlideControls,
  InteractiveTabs,
} from "./interactive";
import { Section, Specimen } from "./specimen";

export const metadata: Metadata = {
  title: "컴포넌트 | Gen.G Admin",
  description: "Figma 컴포넌트 시안을 옮긴 디자인 시스템 카탈로그",
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
];

const COLORS = [
  { token: "ink", value: "#151515", swatch: "bg-ink" },
  { token: "line", value: "#e5e5e5", swatch: "bg-line" },
  { token: "line-soft", value: "#efefef", swatch: "bg-line-soft" },
  { token: "surface-soft", value: "#f6f6f6", swatch: "bg-surface-soft" },
  { token: "control", value: "#d9d9d9", swatch: "bg-control" },
  { token: "on-dark-idle", value: "#eaeaea", swatch: "bg-on-dark-idle" },
  { token: "sale", value: "#ff8a56", swatch: "bg-sale" },
  { token: "geng-gold", value: "#d1b782", swatch: "bg-geng-gold" },
];

const RADII = [
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
      <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 md:px-8 lg:px-gutter">
          <div className="flex items-center gap-3">
            <Logo className="size-9" />
            <div>
              <h1 className="text-[20px] font-bold text-ink">
                컴포넌트 카탈로그
              </h1>
              <p className="text-[13px] text-[#666]">
                Figma · 젠지온라인리뉴얼 / 컴포넌트 모음 (148:2668)
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
                price="189,000원"
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Self Marking Kit (LOL)"
                title="2026 2nd Official Player Self Marking Kit (LOL)"
                price="189,000원"
                titleLines={2}
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Jacket"
                title="2026 2nd Official Player Jacket"
                price="94,500원"
                sale={{ rate: "50%", originalPrice: "189,000원" }}
              />
              <ProductCard
                imageSrc="/assets/images/product-jacket.png"
                imageAlt="2026 2nd Official Player Self Marking Kit (LOL)"
                title="2026 2nd Official Player Self Marking Kit (LOL)"
                price="94,500원"
                titleLines={2}
                sale={{ rate: "50%", originalPrice: "189,000원" }}
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
      </main>
    </div>
  );
}
