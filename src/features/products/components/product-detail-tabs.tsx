"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronToggleIcon } from "@/components/ui/icons";
import { UnderlineTabs } from "@/components/ui/underline-tabs";
import { cn } from "@/lib/utils/cn";
import type {
  ProductDetail,
  ProductQuestion,
  ProductReview,
} from "@/features/products/detail-types";

/**
 * 상품설명 · 상품후기 · Q&A — node 277:8600(탭) + 277:5421 / 277:5740 / 277:8375(본문)
 * 시안 5종은 이 탭의 상태 변형이었다. 탭 라벨에는 건수가 붙는다 (node 277:5730).
 */
export function ProductDetailTabs({ product }: { product: ProductDetail }) {
  const [tab, setTab] = useState("description");

  const tabs = [
    { id: "description", label: "상품설명" },
    { id: "review", label: `상품후기 ${product.reviews.length}` },
    { id: "qna", label: `Q&A ${product.questions.length}` },
  ];

  return (
    <section className="flex flex-col">
      <UnderlineTabs items={tabs} activeId={tab} onSelect={setTab} />

      {tab === "description" && <DescriptionPanel product={product} />}
      {tab === "review" && <ReviewPanel reviews={product.reviews} />}
      {tab === "qna" && <QnaPanel questions={product.questions} />}
    </section>
  );
}

/** 상품설명 — node 277:5421 (접힌 상태) / 277:8607 (펼친 상태) */
function DescriptionPanel({ product }: { product: ProductDetail }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className={cn(
          "relative w-full overflow-hidden",
          !expanded && "max-h-[720px]",
        )}
      >
        <div className="flex flex-col items-start gap-10 py-10">
          <div className="flex flex-col gap-5 px-5 text-ink lg:px-0">
            {product.detailHeading.map((line, index) => (
              <p
                key={line}
                className={cn(
                  "font-bold",
                  index === 0 ? "text-[20px]" : "text-[24px]",
                )}
              >
                {line}
              </p>
            ))}
          </div>

          <dl className="flex w-full flex-col gap-2 px-5 text-[14px] lg:px-0">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex gap-6">
                <dt className="w-[70px] shrink-0 font-bold text-ink">
                  {spec.label}
                </dt>
                <dd className="text-muted">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <hr className="w-full border-line" />

          <ul className="flex w-full flex-col gap-2 px-5 text-[14px] text-muted lg:px-0">
            {product.highlights.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>

          <div className="relative w-full">
            <Image
              src={product.detailImageSrc}
              alt=""
              width={1140}
              height={5620}
              sizes="(max-width: 1024px) 100vw, 1140px"
              className="h-auto w-full"
            />
          </div>
        </div>

        {/* 접힌 상태에서는 아래를 흰색으로 흐린다 — node 277:5424 */}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
        )}
      </div>

      <div className="flex justify-center px-5 pb-[30px] lg:px-0">
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex h-[50px] w-full max-w-[450px] items-center justify-center gap-[3px] rounded-field border border-line bg-white text-[14px] text-muted"
        >
          상품설명 {expanded ? "접기" : "더보기"}
          <ChevronToggleIcon
            direction={expanded ? "up" : "down"}
            className="size-3"
          />
        </button>
      </div>
    </div>
  );
}

/** 상품후기 — node 277:5740 */
function ReviewPanel({ reviews }: { reviews: ProductReview[] }) {
  return (
    <div className="flex flex-col items-center gap-5 pt-5">
      <Button tone="solid" size="md" fullWidth className="font-bold">
        상품후기 작성
      </Button>

      <ul className="w-full">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="flex flex-col gap-3 border-b border-line px-5 py-6 last:border-b-0"
          >
            <div className="flex flex-col gap-[6px]">
              <p className="text-[14px] text-ink">{review.author}</p>
              <p className="text-[12px] text-muted">{review.date}</p>
            </div>
            <p className="text-[14px] font-medium text-muted">
              [옵션] {review.option}
            </p>
            <div className="flex flex-col gap-[6px] text-[14px] text-ink">
              <p className="font-medium">{review.title}</p>
              <p>{review.body}</p>
            </div>
            {review.imageSrc && (
              <div className="relative size-[76px] overflow-hidden rounded-field">
                <Image
                  src={review.imageSrc}
                  alt=""
                  fill
                  sizes="76px"
                  className="object-cover"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Q&A — node 277:8375 */
function QnaPanel({ questions }: { questions: ProductQuestion[] }) {
  return (
    <div className="flex flex-col items-center gap-5 pt-5">
      <Button tone="solid" size="md" fullWidth className="font-bold">
        상품 문의
      </Button>

      <ul className="w-full">
        {questions.map((question) => (
          <li key={question.id} className="flex flex-col">
            <div className="flex flex-col gap-3 border-b border-line px-5 py-6">
              <p className="text-[14px] font-bold text-ink">
                {question.status}
              </p>
              <p className="flex items-center gap-1 text-[14px] text-ink">
                {question.secret && <LockGlyph />}
                {question.secret ? "비밀글 입니다." : question.title}
              </p>
              <p className="flex gap-1 text-muted">
                <span className="text-[14px]">{question.author}</span>
                <span className="text-[12px]">{question.date}</span>
              </p>
            </div>

            {question.answer && (
              <div className="flex flex-col gap-3 bg-surface-soft px-5 py-6">
                <p className="text-[14px] font-bold text-ink">답변</p>
                <div className="text-[14px] text-ink">
                  {question.answer.body.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="text-[12px] text-muted">{question.answer.date}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 비밀글 자물쇠 — node 277:8388 */
function LockGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="size-4 shrink-0"
    >
      <rect
        x="3.5"
        y="7"
        width="9"
        height="7"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
