import { cn } from "@/lib/utils/cn";
import { SearchIcon } from "./icons";

/** 검색창 — node 148:1462 */
export function SearchField({
  placeholder = "검색어를 입력해주세요",
  className,
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <form
      role="search"
      className={cn(
        // 폭은 호출부가 정한다. 시안(node 148:1462)의 236px은 PC 헤더에서만 쓰인다.
        "flex w-full items-center justify-between gap-2 rounded-field border border-muted bg-white px-3 py-2",
        className,
      )}
    >
      <input
        type="search"
        placeholder={placeholder}
        aria-label="상품 검색"
        className="min-w-0 flex-1 bg-transparent text-[14px] font-bold text-ink outline-none placeholder:text-muted"
      />
      <button type="submit" aria-label="검색" className="text-ink">
        <SearchIcon />
      </button>
    </form>
  );
}
