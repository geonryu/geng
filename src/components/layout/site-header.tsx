"use client";

import Link from "next/link";
import { useState } from "react";

import {
  CartIcon,
  CloseIcon,
  GlobeIcon,
  LikeIcon,
  MenuIcon,
  MyPageIcon,
  type IconProps,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { SearchField } from "@/components/ui/search-field";
import { Slogan } from "@/components/ui/slogan";

/**
 * HEADER — node 148:1402 (SLOGAN + NAVIGATION BAR)
 * 시안은 PC(1440) 전용이다. lg 미만에서는 GNB·검색창을 토글 패널로 접는다.
 * 모바일 상세 시안이 나오면 이 분기만 교체하면 된다.
 */

const NAV_ITEMS = [
  { label: "NEW", href: "/new" },
  { label: "BEST", href: "/best" },
  { label: "SALE", href: "/sale" },
  { label: "PRO", href: "/pro" },
  { label: "GenRang", href: "/genrang" },
  { label: "SHOP", href: "/shop" },
  { label: "Q&A", href: "/qna" },
];

const UTILITY_ITEMS: {
  label: string;
  href: string;
  Icon: (props: IconProps) => React.ReactElement;
}[] = [
  { label: "찜한 상품", href: "/wishlist", Icon: LikeIcon },
  { label: "장바구니", href: "/cart", Icon: CartIcon },
  { label: "언어 선택", href: "/locale", Icon: GlobeIcon },
  { label: "마이페이지", href: "/mypage", Icon: MyPageIcon },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      <Slogan />

      <nav
        aria-label="주 메뉴"
        className="mx-auto w-full max-w-[1440px] px-6 py-2 lg:px-gutter"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-[39px]">
            <Link href="/" aria-label="Gen.G Online Store 홈">
              <Logo />
            </Link>
            <ul className="hidden items-center gap-10 text-[16px] font-bold text-ink lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {/* 좁은 화면에서는 검색창을 토글 패널로 내린다. */}
            <div className="hidden lg:block">
              <SearchField className="w-[236px]" />
            </div>
            <ul className="flex items-center gap-4 text-ink">
              {UTILITY_ITEMS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="block hover:opacity-70"
                  >
                    <Icon />
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-controls="mobile-nav"
              aria-expanded={open}
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              className="text-ink lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        <div id="mobile-nav" hidden={!open} className="pb-2 lg:hidden">
          <SearchField className="mt-4" />
          <ul className="mt-2 flex flex-col text-[16px] font-bold text-ink">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
