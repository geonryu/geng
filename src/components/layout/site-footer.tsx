import Link from "next/link";

import { InstagramIcon, XIcon, YoutubeIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";

/** FOOTER — node 148:2420 */

const POLICY_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy" },
  { label: "이용안내", href: "/guide" },
  { label: "광고제휴문의", href: "/partnership" },
];

const SUPPORT_LINKS = [
  { label: "1:1문의", href: "/support/inquiry" },
  { label: "공지사항", href: "/support/notice" },
  { label: "FAQ", href: "/support/faq" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/genggg", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/geng",
    Icon: InstagramIcon,
  },
  { label: "YouTube", href: "https://www.youtube.com/@GenG", Icon: YoutubeIcon },
];

/** 사업자 정보. 시안 텍스트를 줄 단위로 그대로 옮겼다. */
const BUSINESS_INFO = [
  "법인명(상호)케이에스브이이스포츠코리아 주식회사",
  "대표자(성명)아놀드원허사업자",
  "통신판매업 신고제 2024-서울강남-01127 호",
  "전화010-8114-3445",
  "주소06100 서울특별시 강남구 봉은사로49길 38 (논현동) 1층",
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-[50px] lg:flex-row lg:justify-between lg:px-gutter">
        <div className="flex w-full flex-col gap-4 lg:w-[472px]">
          <Logo tone="white" />

          <address className="flex flex-col gap-[17px] text-[14px] not-italic">
            <p>{BUSINESS_INFO[0]}</p>
            <p>{BUSINESS_INFO[1]}</p>
            <p>
              등록번호 안내789-88-00514{" "}
              <Link href="/business-info" className="underline">
                [사업자정보확인]
              </Link>
            </p>
            {BUSINESS_INFO.slice(2).map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              개인정보보호책임자케이에스브이이스포츠코리아주식회사{" "}
              <a href="mailto:geng_cs@geng.gg" className="underline">
                (geng_cs@geng.gg)
              </a>
            </p>
          </address>

          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="block hover:opacity-70"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col justify-between gap-12 lg:w-[589px] lg:gap-[148px]">
          <div className="flex flex-wrap gap-x-[87px] gap-y-10 text-[14px]">
            <ul className="flex flex-col gap-[17px]">
              {POLICY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-[17px]">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:opacity-70">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-[17px]">
              <a
                href="mailto:geng_cs@geng.gg"
                className="text-[18px] font-bold hover:opacity-70"
              >
                geng_cs@geng.gg
              </a>
              <p>AM 10:00 ~ PM 12:00, PM 01:00~05:00</p>
              <p>주말, 공휴일 제외</p>
            </div>
          </div>

          <p className="text-[18px]">
            COPYRIGHT © 케이에스브이이스포츠코리아 주식회사. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
