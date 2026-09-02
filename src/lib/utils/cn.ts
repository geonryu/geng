type ClassValue = string | false | null | undefined;

/** 조건부 className 결합. shadcn/ui 도입 시 clsx + tailwind-merge 구현으로 교체한다. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
