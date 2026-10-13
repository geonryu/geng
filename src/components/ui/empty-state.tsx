import Image from "next/image";
import Link from "next/link";

import { ChevronToggleIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils/cn";

/**
 * 비어 있는 목록 안내.
 *
 * 시안에는 빈 장바구니(node 277:6315)만 있다. 마이페이지 하위 화면들은 시안이
 * 없어, 그 구성(45px 안내 아이콘 + 문구 + 선택적 링크 버튼, 위아래 구분선)을
 * 그대로 일반화해 재사용한다. features/cart/components/cart-empty.tsx 가 원형이다.
 */
export function EmptyState({
  message,
  action,
  className,
}: {
  message: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col gap-6 border-y border-line py-[50px]", className)}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src="/assets/icons/empty-state.svg"
          alt=""
          width={45}
          height={45}
          unoptimized
        />
        <p className="text-center text-[16px] font-medium text-ink">{message}</p>
      </div>

      {action && (
        <div className="flex justify-center">
          <Link
            href={action.href}
            className="flex h-[45px] items-center justify-center gap-1 rounded-field border border-muted px-4 text-[14px] text-muted"
          >
            {action.label}
            <ChevronToggleIcon direction="down" className="size-4 -rotate-90" />
          </Link>
        </div>
      )}
    </div>
  );
}
