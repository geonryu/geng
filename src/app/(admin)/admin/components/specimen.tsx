import { cn } from "@/lib/utils/cn";

/** 컴포넌트 갤러리용 레이아웃 프리미티브 (어드민 전용, 디자인 시스템 컴포넌트가 아니다) */
export function Section({
  id,
  title,
  node,
  description,
  children,
}: {
  id: string;
  title: string;
  node: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10">
      <header className="mb-6">
        <div className="flex flex-wrap items-baseline gap-3">
          <h2 className="text-[22px] font-bold text-ink">{title}</h2>
          <code className="rounded bg-surface-soft px-2 py-0.5 text-[12px] text-[#666]">
            {node}
          </code>
        </div>
        {description && (
          <p className="mt-2 max-w-[70ch] text-[14px] text-[#666]">
            {description}
          </p>
        )}
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

export function Specimen({
  label,
  dark = false,
  className,
  children,
}: {
  label: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-[12px] font-medium tracking-wide text-[#666] uppercase">
        {label}
      </figcaption>
      <div
        className={cn(
          "rounded-card border p-6",
          dark ? "border-ink bg-ink" : "border-line bg-white",
          className,
        )}
      >
        {children}
      </div>
    </figure>
  );
}
