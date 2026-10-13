import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { notFound } from "next/navigation";

import { LOCALES, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gen.G Online Store",
  description: "멀티몰 커머스 통합 운영 플랫폼",
};

/**
 * 모든 라우트가 이 아래에 있다. `[locale]` 은 루트 레이아웃보다 위에 있는
 * 동적 세그먼트라 **root parameter** 가 되고, 어느 Server Component 에서든
 * `next/root-params` 로 꺼낼 수 있다 (prop drilling 불필요).
 *
 * 한국어는 접두사가 없다 — src/proxy.ts 가 `/cart` 를 `/ko/cart` 로 rewrite 하므로
 * 주소창에는 `/ko` 가 드러나지 않는다.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;

  // proxy 가 걸러주지만, 직접 접근으로 들어온 잘못된 로케일도 여기서 막는다.
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale} dict={dict}>
          {props.children}
        </LocaleProvider>
      </body>
    </html>
  );
}
