import Image from "next/image";
import { LocaleLink } from "@/components/ui/locale-link";

import { ChevronToggleIcon } from "@/components/ui/icons";

/**
 * 빈 장바구니 — node 277:6315
 * 45px 안내 아이콘 + 문구 + "계속 쇼핑하기"(우측 셰브런) 구성이며 위아래를 구분선이 감싼다.
 */
export function CartEmpty() {
  return (
    <div className="flex flex-col gap-6 border-y border-line py-[50px]">
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src="/assets/icons/empty-state.svg"
          alt=""
          width={45}
          height={45}
          unoptimized
        />
        <p className="text-center text-[16px] font-medium text-ink">
          장바구니에 담긴 상품이 없습니다.
        </p>
      </div>

      <div className="flex justify-center">
        <LocaleLink
          href="/"
          className="flex h-[45px] items-center justify-center gap-1 rounded-field border border-muted px-4 text-[14px] text-muted"
        >
          계속 쇼핑하기
          <ChevronToggleIcon direction="down" className="size-4 -rotate-90" />
        </LocaleLink>
      </div>
    </div>
  );
}
