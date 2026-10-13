import { LocaleLink } from "@/components/ui/locale-link";

import { Container } from "@/components/layout/container";
import {
  ChevronToggleIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

/**
 * FOOTER — node 277:6101 (PC, 423px) · node 290:13326 (MO, 180px)
 *
 * PC: 본문 1140 안에서 좌 472px / 우 259px 두 덩어리. 우측은 고객지원 · 정책 두 링크 열 →
 *     문의처 → SNS 순으로 쌓인다.
 * MO: 사업자 정보를 "사업자정보" 토글 뒤로 접고, 정책 링크를 한 줄로 눕힌 축약형이다.
 *     토글은 상태가 필요 없어 <details>로 처리해 Server Component를 유지했다.
 */

/** PC 좌측 열 — node 277:6112 */
const SUPPORT_LINKS = [
  { key: "inquiry", href: "/support/inquiry" },
  { key: "notice", href: "/support/notice" },
  { key: "faq", href: "/support/faq" },
] as const;

/** PC 우측 열 — node 277:6114 */
const POLICY_LINKS = [
  { key: "about", href: "/about" },
  { key: "terms", href: "/terms" },
  { key: "privacy", href: "/privacy" },
  { key: "guide", href: "/guide" },
  { key: "partnership", href: "/partnership" },
] as const;

/** MO 한 줄 링크 — node 290:13338 */
const MOBILE_LINKS = [
  { key: "notice", href: "/support/notice" },
  { key: "terms", href: "/terms" },
  { key: "privacy", href: "/privacy" },
  { key: "partnership", href: "/partnership" },
] as const;

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com/genggg", Icon: XIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/geng",
    Icon: InstagramIcon,
  },
  { label: "YouTube", href: "https://www.youtube.com/@GenG", Icon: YoutubeIcon },
];

/**
 * 사업자 정보 — node 277:6107.
 * 법적 표기라 기계번역 대상에서 제외한다 (dictionaries 의 legal.business).
 */

const OFFICE_HOURS = ["AM 10:00 ~ PM 12:00", "PM 01:00 ~ 05:00"];

function BusinessInfo({
  dict,
  className,
}: {
  dict: Dictionary;
  className?: string;
}) {
  const business = dict.legal.business;

  return (
    <address className={className}>
      <p>{business.companyName}</p>
      <p>{business.representative}</p>
      <p>
        {business.registrationNo}{" "}
        <LocaleLink href="/business-info" className="underline">
          {business.registrationCheck}
        </LocaleLink>
      </p>
      <p>{business.mailOrderNo}</p>
      <p>{business.phone}</p>
      <p>{business.address}</p>
      <p>
        {business.privacyOfficer}{" "}
        <a href="mailto:geng_cs@geng.gg" className="underline">
          (geng_cs@geng.gg)
        </a>
      </p>
    </address>
  );
}

function SocialLinks({ size }: { size: "sm" | "md" }) {
  return (
    <ul className={size === "sm" ? "flex items-center gap-4" : "flex items-center gap-4"}>
      {SOCIAL_LINKS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={label}
            className="block hover:opacity-70"
          >
            <Icon className={size === "sm" ? "size-4" : "size-5"} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export async function SiteFooter() {
  const dict = await getDictionary();

  return (
    <footer className="bg-ink text-white">
      {/* MO — node 290:13326 */}
      <div className="px-5 py-[30px] lg:hidden">
        <div className="flex flex-col gap-3">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between">
              <Logo tone="white" className="size-6" />
              <span className="flex items-center gap-[5px] text-[14px] font-bold">
                {dict.footer.businessInfoToggle}
                <ChevronToggleIcon className="size-3 group-open:rotate-180" />
              </span>
            </summary>
            <BusinessInfo dict={dict} className="mt-3 flex flex-col gap-2 text-[12px]/[1.5] not-italic" />
          </details>

          <ul className="flex items-center justify-between text-[12px]/[1.5]">
            {MOBILE_LINKS.map((item, index) => (
              <li key={item.key} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="h-2 w-px bg-white/40" />
                )}
                <LocaleLink href={item.href} className="hover:opacity-70">
                  {dict.footer.links[item.key]}
                </LocaleLink>
              </li>
            ))}
          </ul>

          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[15px]">
              <SocialLinks size="sm" />
              <a
                href="mailto:geng_cs@geng.gg"
                className="text-[12px]/[1.5] font-bold hover:opacity-70"
              >
                geng_cs@geng.gg
              </a>
            </div>

            <div className="text-right text-[12px]/[1.5]">
              <p>{dict.footer.officeHoursNote}</p>
              {OFFICE_HOURS.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PC — node 277:6101 */}
      <Container className="hidden py-[50px] lg:flex lg:justify-between">
        <div className="flex w-[472px] flex-col gap-4">
          <Logo tone="white" />
          <BusinessInfo dict={dict} className="flex flex-col gap-5 text-[14px] not-italic" />
          <p className="text-[13px]">
            {dict.legal.business.copyright}
          </p>
        </div>

        <div className="flex w-[259px] flex-col items-end gap-[45px]">
          <div className="flex justify-end gap-10">
            <ul className="flex flex-col gap-5 text-right text-[14px]">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.key}>
                  <LocaleLink href={item.href} className="hover:opacity-70">
                    {dict.footer.links[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-5 text-right text-[14px]">
              {POLICY_LINKS.map((item) => (
                <li key={item.key}>
                  <LocaleLink href={item.href} className="hover:opacity-70">
                    {dict.footer.links[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col items-end gap-4 text-right">
            <div className="flex flex-col gap-5">
              <a
                href="mailto:geng_cs@geng.gg"
                className="text-[18px] font-bold hover:opacity-70"
              >
                geng_cs@geng.gg
              </a>
              <p className="text-[14px]">AM 10:00 ~ PM 12:00, PM 01:00~05:00</p>
              <p className="text-[14px]">{dict.footer.officeHoursNote}</p>
            </div>

            <SocialLinks size="md" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
