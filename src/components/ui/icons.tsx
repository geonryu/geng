import { cn } from "@/lib/utils/cn";

/**
 * Figma "컴포넌트 모음" 섹션의 아이콘들.
 * Figma가 분할 export 한 벡터를 24×24 좌표계로 합성했고, 색은 currentColor로 열어
 * Default(#151515) / Variant2(white) 두 시안을 하나의 컴포넌트로 흡수한다.
 */
export type IconProps = {
  className?: string;
};

const ICON_BASE = "size-6 shrink-0";
const STROKE = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeMiterlimit: 10,
  strokeLinejoin: "round",
} as const;

function IconRoot({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(ICON_BASE, className)}
    >
      {children}
    </svg>
  );
}

/** 검색 — node 148:1458 */
export function SearchIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        transform="translate(2 2)"
        d="M7.74159 14.4831C11.4649 14.4831 14.4832 11.4648 14.4832 7.74157C14.4832 4.0183 11.4649 1 7.74159 1C4.01831 1 1 4.0183 1 7.74157C1 11.4648 4.01831 14.4831 7.74159 14.4831Z"
        {...STROKE}
      />
      <path
        transform="translate(14 13)"
        d="M1 1L8 8"
        {...STROKE}
        strokeLinecap="round"
      />
    </IconRoot>
  );
}

/** 장바구니 — node 148:1455 */
export function CartIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        transform="translate(4 6.3333)"
        d="M1 1H14.3333V15.6667H1V1Z"
        {...STROKE}
      />
      <path
        transform="translate(6.6667 1)"
        d="M1 8.33333V2.33333C1 1.59667 1.59667 1 2.33333 1H7.66667C8.40333 1 9 1.59667 9 2.33333V8.33333"
        {...STROKE}
      />
    </IconRoot>
  );
}

/** 글로벌(언어) — node 148:1456 */
export function GlobeIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <g transform="translate(1 1)">
        <path
          d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
          {...STROKE}
        />
        <path d="M2.33301 6.33333H19.6663" {...STROKE} />
        <path d="M2.33301 15.6667H19.6663" {...STROKE} />
        <path
          d="M10.9997 1C10.9997 1 6.33301 4.33333 6.33301 11C6.33301 17.6667 10.9997 21 10.9997 21"
          {...STROKE}
        />
        <path
          d="M11 1C11 1 15.6667 4.33333 15.6667 11C15.6667 17.6667 11 21 11 21"
          {...STROKE}
        />
      </g>
    </IconRoot>
  );
}

/** 마이페이지 — node 148:1457 */
export function MyPageIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        transform="translate(1 1)"
        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
        {...STROKE}
      />
      <path
        transform="translate(7 3.6667)"
        d="M5 9C7.20914 9 9 7.20914 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 7.20914 2.79086 9 5 9Z"
        {...STROKE}
      />
      <path
        transform="translate(4.3333 11.6667)"
        d="M14.3333 7.66667C14.3333 3.98467 11.3487 1 7.66667 1C3.98467 1 1 3.98467 1 7.66667"
        {...STROKE}
      />
    </IconRoot>
  );
}

/** 찜 — node 148:1454 */
export function LikeIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        transform="translate(1 2)"
        d="M19.2287 11.0246L11 19L2.77133 11.0246C1.64133 9.92938 1 8.39662 1 6.79115C1 3.59269 3.49667 1 6.57667 1H6.69C8.16933 1 9.58733 1.60992 10.6333 2.69615L11 3.07692L11.3667 2.69615C12.4127 1.60992 13.8307 1 15.31 1H15.4233C18.5033 1 21 3.59269 21 6.79115C21 8.39662 20.3587 9.92938 19.2287 11.0246Z"
        {...STROKE}
      />
    </IconRoot>
  );
}

/** arrow(R_UP) — node 148:2293 */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M8.25251 6.00011C7.70042 6.00033 7.25262 6.44786 7.25262 7C7.25262 7.55215 7.70042 7.99967 8.25251 7.99989L14.8388 7.99989L6.29277 16.5459C5.90225 16.9365 5.90225 17.5696 6.29278 17.9602C6.6833 18.3507 7.31646 18.3507 7.70699 17.9602L16.253 9.41411L16.253 16.0004C16.2533 16.5525 16.7008 17.0003 17.2529 17.0003C17.8051 17.0003 18.2526 16.5525 18.2528 16.0004L18.2528 7C18.2528 6.44772 17.8052 6.00011 17.2529 6.00011L8.25251 6.00011Z"
        fill="currentColor"
      />
    </IconRoot>
  );
}

/**
 * 슬라이드 컨트롤 셰브런.
 * 시안은 12px 길이의 2px 라인 두 개를 ±45°로 배치한 형태다(node 148:2053).
 */
export function ChevronIcon({
  direction,
  className,
}: IconProps & { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 10 18"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("h-[17px] w-[10px] shrink-0", className)}
    >
      <path
        d={direction === "left" ? "M8.5 1L1 9L8.5 17" : "M1.5 1L9 9L1.5 17"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** arrow(L) — node 148:1523 */
export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M10.4072 4.92871C10.7978 4.53848 11.4309 4.53829 11.8213 4.92871C12.2117 5.31914 12.2115 5.95223 11.8213 6.34277L7.16406 11H19.25C19.8023 11 20.25 11.4477 20.25 12C20.25 12.5523 19.8023 13 19.25 13H7.16406L11.8213 17.6572C12.2115 18.0478 12.2117 18.6809 11.8213 19.0713C11.4309 19.4617 10.7978 19.4615 10.4072 19.0713L4.04297 12.707C3.65244 12.3165 3.65244 11.6835 4.04297 11.293L10.4072 4.92871Z"
        fill="currentColor"
      />
    </IconRoot>
  );
}

/** arrow(R) — node 148:1524 */
export function ArrowRightIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M13.5928 4.92871C13.2022 4.53848 12.5691 4.53829 12.1787 4.92871C11.7883 5.31914 11.7885 5.95223 12.1787 6.34277L16.8359 11H4.75C4.19771 11 3.75 11.4477 3.75 12C3.75 12.5523 4.19771 13 4.75 13H16.8359L12.1787 17.6572C11.7885 18.0478 11.7883 18.6809 12.1787 19.0713C12.5691 19.4617 13.2022 19.4615 13.5928 19.0713L19.957 12.707C20.3476 12.3165 20.3476 11.6835 19.957 11.293L13.5928 4.92871Z"
        fill="currentColor"
      />
    </IconRoot>
  );
}

/** pause — node 148:1526 */
export function PauseIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M7.25 18.5V5.5C7.25 4.80964 7.80964 4.25 8.5 4.25C9.19036 4.25 9.75 4.80964 9.75 5.5V18.5C9.75 19.1904 9.19036 19.75 8.5 19.75C7.80964 19.75 7.25 19.1904 7.25 18.5ZM14.25 18.5V5.5C14.25 4.80964 14.8096 4.25 15.5 4.25C16.1904 4.25 16.75 4.80964 16.75 5.5V18.5C16.75 19.1904 16.1904 19.75 15.5 19.75C14.8096 19.75 14.25 19.1904 14.25 18.5Z"
        fill="currentColor"
      />
    </IconRoot>
  );
}

/** start — node 148:1530 */
export function PlayIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M17.6585 10.268C18.9918 11.0378 18.9918 12.9623 17.6584 13.7321L6.3415 20.2659C5.00817 21.0357 3.3415 20.0734 3.3415 18.5338L3.3415 5.46616C3.3415 3.92656 5.00817 2.96431 6.3415 3.73411L17.6585 10.268Z"
        fill="currentColor"
      />
    </IconRoot>
  );
}

/**
 * 소셜 아이콘 — FOOTER node 148:2427 / 148:2429 / 148:2431.
 * Figma export(20×20 좌표계)를 그대로 인라인했고, 색만 currentColor로 열었다.
 */
function SocialIconRoot({
  label,
  className,
  children,
}: IconProps & { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      role="img"
      aria-label={label}
      className={cn("size-5 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

/** X (구 Twitter) — node 148:2427 */
export function XIcon({ className }: IconProps) {
  return (
    <SocialIconRoot label="X" className={className}>
      <path
        d="M11.8618 8.46864L19.1472 0H17.4208L11.0949 7.3532L6.04243 0H0.215025L7.85533 11.1193L0.215025 20H1.94152L8.6218 12.2348L13.9576 20H19.785L11.8614 8.46864H11.8618ZM9.49713 11.2173L8.72301 10.1101L2.5636 1.29967H5.21539L10.1861 8.40994L10.9602 9.51718L17.4216 18.7594H14.7698L9.49713 11.2177V11.2173Z"
        fill="currentColor"
      />
    </SocialIconRoot>
  );
}

/** Instagram — node 148:2429 */
export function InstagramIcon({ className }: IconProps) {
  return (
    <SocialIconRoot label="Instagram" className={className}>
      <path
        d="M9.99973 4.86465C7.16406 4.86465 4.86484 7.1643 4.86484 9.99992C4.86484 12.8361 7.16406 15.1348 9.99973 15.1348C12.8359 15.1348 15.1355 12.8361 15.1355 9.99992C15.1355 7.1643 12.8359 4.86465 9.99973 4.86465ZM9.99973 13.3334C8.1591 13.3334 6.66629 11.841 6.66629 9.99992C6.66629 8.15887 8.15906 6.66652 9.99973 6.66652C11.8408 6.66652 13.3336 8.15887 13.3336 9.99992C13.3336 11.841 11.8408 13.3334 9.99973 13.3334ZM16.538 4.66203C16.538 5.32422 16.0007 5.8616 15.338 5.8616C14.6755 5.8616 14.138 5.32422 14.138 4.66203C14.138 3.99957 14.6754 3.46203 15.338 3.46203C16.0007 3.46203 16.538 3.99957 16.538 4.66203ZM19.475 3.44973C19.2194 2.79184 18.8775 2.23441 18.3219 1.6784C17.201 0.556719 15.6675 0.130312 14.1233 0.0603906C13.0565 0.0110938 12.7159 0.000195312 9.99973 0.000195312C7.28445 0.000195312 6.94391 0.0110938 5.87711 0.0603906C4.32918 0.130469 2.79742 0.559531 1.67863 1.67836C0.555469 2.80152 0.131055 4.33031 0.0600391 5.8773C0.0114453 6.9441 0 7.28426 0 9.99992C0 12.7156 0.0114453 13.0563 0.0600391 14.1235C0.131367 15.6759 0.555039 17.1989 1.67855 18.3216C2.80191 19.4441 4.33023 19.8692 5.87711 19.94C6.94391 19.9887 7.28445 19.9998 9.99973 19.9998C12.716 19.9998 13.0565 19.9887 14.1233 19.94C15.6738 19.869 17.2007 19.4436 18.3218 18.3216C19.4422 17.2004 19.8697 15.6671 19.9398 14.1235C19.9886 13.0563 20 12.7156 20 9.99988C20 7.28418 19.9886 6.94406 19.9398 5.87727C19.8915 4.81262 19.7224 4.08598 19.475 3.44973ZM18.1398 14.0408C18.0904 15.127 17.838 16.2567 17.0478 17.048C16.2471 17.8497 15.1341 18.0902 14.0412 18.1401C12.9864 18.1879 12.6705 18.1983 9.99973 18.1983C7.32988 18.1983 7.01402 18.1878 5.95918 18.1401C4.86348 18.0901 3.75227 17.8455 2.95223 17.0481C2.15449 16.2529 1.90898 15.1262 1.86012 14.0408C1.81234 12.9866 1.80187 12.6703 1.80187 9.99988C1.80187 7.33004 1.81238 7.01379 1.86012 5.95894C1.90883 4.87781 2.16605 3.73977 2.95207 2.95242C3.74902 2.15414 4.8718 1.90988 5.95926 1.86027C7.01402 1.81211 7.32988 1.80203 9.99973 1.80203C12.6702 1.80203 12.9864 1.81211 14.0412 1.86027C15.1363 1.91023 16.2493 2.15367 17.0477 2.95227C17.8464 3.75125 18.0902 4.8698 18.1398 5.95902C18.1881 7.01379 18.1986 7.33004 18.1986 9.99992C18.1986 12.6704 18.1881 12.9866 18.1398 14.0408Z"
        fill="currentColor"
      />
    </SocialIconRoot>
  );
}

/**
 * YouTube — node 148:2431.
 * 시안은 20×14.09 아트보드를 20×20 박스 안에 세로 중앙(inset 14.77%) 정렬한다.
 * 재생 삼각형은 배경색(ink)으로 뚫려 있어 어두운 푸터 위에서만 성립한다.
 */
export function YoutubeIcon({ className }: IconProps) {
  return (
    <SocialIconRoot label="YouTube" className={className}>
      <g transform="translate(0 2.9545)">
        <path
          d="M19.5821 2.20031C19.3521 1.33422 18.6744 0.652148 17.8139 0.420625C16.2542 0 10 0 10 0C10 0 3.74582 0 2.18613 0.420625C1.32563 0.652109 0.64793 1.33422 0.41793 2.20031C0 3.77016 0 7.04547 0 7.04547C0 7.04547 0 10.3208 0.41793 11.8906C0.64793 12.7567 1.32563 13.4388 2.18613 13.6703C3.74582 14.0909 10 14.0909 10 14.0909C10 14.0909 16.2542 14.0909 17.8139 13.6703C18.6744 13.4388 19.3521 12.7567 19.5821 11.8906C20 10.3208 20 7.04547 20 7.04547C20 7.04547 20 3.77016 19.5821 2.20031Z"
          fill="currentColor"
        />
        <path
          d="M7.9541 10.0193L13.1814 7.04561L7.9541 4.07178V10.0193Z"
          className="fill-ink"
        />
      </g>
    </SocialIconRoot>
  );
}

/**
 * 햄버거 / 닫기 — 시안에 없는 아이콘.
 * 메인시안1은 PC 전용이라 모바일 GNB 토글용 글리프가 정의돼 있지 않다.
 * 모바일 상세 시안이 나오면 export 에셋으로 교체한다.
 */
export function MenuIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </IconRoot>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <IconRoot className={className}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </IconRoot>
  );
}
