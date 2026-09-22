"use client";

import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/layout/container";
import {
  CartIcon,
  CloseIcon,
  GlobeIcon,
  MenuIcon,
  MyPageIcon,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { SearchField } from "@/components/ui/search-field";

/**
 * HEADER — node 277:6029 (PC, 116px) · node 290:13056 (MO, 82px)
 *
 * PC: 슬로건 바(35px)에 유틸 링크가 들어가고, 네비 바(80px)에 로고·GNB·검색창이 놓인다.
 *     구 시안(148:1402)은 유틸 아이콘을 네비 바에 두었다 — 여기서 대체된다.
 * MO: 슬로건 바는 문구만 남고, 네비 바는 햄버거 / 가운데 로고 / 장바구니·마이페이지 구성이다.
 *     시안의 MO 슬로건 배경은 #222지만 PC(#151515)와 한 단계 차이뿐이라 ink 토큰으로 통일했다.
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

const SLOGAN_MESSAGES = ["#CHANGE THE GAME", "#CHANGE THE WORLD"];

export function SiteHeader({
  cartCount = 0,
  locale = "KR",
}: {
  cartCount?: number;
  locale?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-white">
      {/* SLOGAN — node 277:6030 / 290:13057 */}
      <div className="bg-ink text-white">
        <Container className="flex min-h-[26px] items-center justify-center gap-2 py-1 text-[12px] font-bold lg:min-h-[35px] lg:justify-between lg:text-[13px]">
          <p className="flex items-center gap-1">
            {SLOGAN_MESSAGES.map((message) => (
              <span key={message}>{message}</span>
            ))}
          </p>

          {/* 유틸 링크는 PC 전용. MO는 네비 바 아이콘이 같은 역할을 한다. */}
          <ul className="hidden items-center gap-3 lg:flex">
            <li className="flex items-center gap-1">
              <Link href="/login" className="hover:opacity-70">
                로그인
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/signup" className="hover:opacity-70">
                회원가입
              </Link>
            </li>
            <li>
              <Link href="/mypage" className="hover:opacity-70">
                마이페이지
              </Link>
            </li>
            <li>
              <Link href="/cart" className="flex items-center hover:opacity-70">
                <CartIcon className="size-4" />
                <span className="ml-[2px] flex items-center gap-[2px]">
                  <span>장바구니</span>
                  <span>{cartCount}</span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/locale"
                className="flex items-center hover:opacity-70"
                aria-label="언어 선택"
              >
                <GlobeIcon className="size-4" />
                <span>{locale}</span>
              </Link>
            </li>
          </ul>
        </Container>
      </div>

      {/* NAVIGATION BAR — node 277:6060 / 290:13060 */}
      <nav aria-label="주 메뉴">
        <Container className="flex h-12 items-center justify-between gap-4 lg:h-[80px] lg:py-2">
          {/* MO: 햄버거 — PC에서는 감춘다 */}
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

          {/* MO에서는 가운데, PC에서는 GNB와 함께 왼쪽에 놓인다 */}
          <div className="flex items-center gap-[39px]">
            <Link href="/" aria-label="Gen.G Online Store 홈">
              <Logo className="size-9 lg:size-[50px]" />
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

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden lg:block">
              <SearchField className="w-[236px]" />
            </div>

            {/* MO: 장바구니 · 마이페이지 아이콘 — node 290:13071 */}
            <Link href="/cart" aria-label="장바구니" className="text-ink lg:hidden">
              <CartIcon />
            </Link>
            <Link
              href="/mypage"
              aria-label="마이페이지"
              className="text-ink lg:hidden"
            >
              <MyPageIcon />
            </Link>
          </div>
        </Container>

        <Container>
          <div id="mobile-nav" hidden={!open} className="pb-2 lg:hidden">
            <SearchField className="mt-2" />
            <ul className="mt-2 flex flex-col text-[16px] font-bold text-ink">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.label}
                  className="border-b border-line last:border-b-0"
                >
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
        </Container>
      </nav>
    </header>
  );
}
