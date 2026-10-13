"use client";

import { LocaleLink } from "@/components/ui/locale-link";
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
import { useDict, useLocale } from "@/i18n/locale-context";

/**
 * HEADER — node 277:6029 (PC, 116px) · node 290:13056 (MO, 82px)
 *
 * PC: 슬로건 바(35px)에 유틸 링크가 들어가고, 네비 바(80px)에 로고·GNB·검색창이 놓인다.
 *     구 시안(148:1402)은 유틸 아이콘을 네비 바에 두었다 — 여기서 대체된다.
 * MO: 슬로건 바는 문구만 남고, 네비 바는 햄버거 / 가운데 로고 / 장바구니·마이페이지 구성이다.
 *     시안의 MO 슬로건 배경은 #222지만 PC(#151515)와 한 단계 차이뿐이라 ink 토큰으로 통일했다.
 */

const NAV_ITEMS = [
  { key: "new", href: "/new" },
  { key: "best", href: "/best" },
  { key: "sale", href: "/sale" },
  { key: "pro", href: "/pro" },
  { key: "genrang", href: "/genrang" },
  { key: "shop", href: "/shop" },
  { key: "qna", href: "/qna" },
] as const;

const SLOGAN_MESSAGES = ["#CHANGE THE GAME", "#CHANGE THE WORLD"];

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const [open, setOpen] = useState(false);
  const dict = useDict();
  const locale = useLocale();

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
              <LocaleLink href="/login" className="hover:opacity-70">
                {dict.common.login}
              </LocaleLink>
              <span aria-hidden="true">/</span>
              <LocaleLink href="/signup" className="hover:opacity-70">
                {dict.common.signup}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/mypage" className="hover:opacity-70">
                {dict.common.mypage}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink href="/cart" className="flex items-center hover:opacity-70">
                <CartIcon className="size-4" />
                <span className="ml-[2px] flex items-center gap-[2px]">
                  <span>{dict.common.cart}</span>
                  <span>{cartCount}</span>
                </span>
              </LocaleLink>
            </li>
            <li>
              <LocaleLink
                href="/locale"
                className="flex items-center hover:opacity-70"
                aria-label={dict.nav.localeSelect}
              >
                <GlobeIcon className="size-4" />
                <span>{locale.toUpperCase()}</span>
              </LocaleLink>
            </li>
          </ul>
        </Container>
      </div>

      {/* NAVIGATION BAR — node 277:6060 / 290:13060 */}
      <nav aria-label={dict.nav.main}>
        <Container className="flex h-12 items-center justify-between gap-4 lg:h-[80px] lg:py-2">
          {/* MO: 햄버거 — PC에서는 감춘다 */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="text-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* MO에서는 가운데, PC에서는 GNB와 함께 왼쪽에 놓인다 */}
          <div className="flex items-center gap-[39px]">
            <LocaleLink href="/" aria-label={dict.nav.homeLink}>
              <Logo className="size-9 lg:size-[50px]" />
            </LocaleLink>
            <ul className="hidden items-center gap-10 text-[16px] font-bold text-ink lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <LocaleLink href={item.href} className="hover:opacity-70">
                    {dict.nav.items[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden lg:block">
              <SearchField className="w-[236px]" />
            </div>

            {/* MO: 장바구니 · 마이페이지 아이콘 — node 290:13071 */}
            <LocaleLink
              href="/cart"
              aria-label={dict.common.cart}
              className="text-ink lg:hidden"
            >
              <CartIcon />
            </LocaleLink>
            <LocaleLink
              href="/mypage"
              aria-label={dict.common.mypage}
              className="text-ink lg:hidden"
            >
              <MyPageIcon />
            </LocaleLink>
          </div>
        </Container>

        <Container>
          <div id="mobile-nav" hidden={!open} className="pb-2 lg:hidden">
            <SearchField className="mt-2" />
            <ul className="mt-2 flex flex-col text-[16px] font-bold text-ink">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.key}
                  className="border-b border-line last:border-b-0"
                >
                  <LocaleLink
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3"
                  >
                    {dict.nav.items[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}
