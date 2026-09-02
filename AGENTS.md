<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 젠지 글로벌 스토어 (Gen.G Online Store) — 프로젝트 지침

멀티몰 커머스 **운영 플랫폼**. 카페24 등 기존 채널 위에서 주문 수집·생산(Pasto)·출고·콘텐츠·재고를 통합 운영하고, 점진적으로 독립 플랫폼으로 확장한다.

**스택:** Next.js (App Router) + React + TypeScript + Tailwind + shadcn/ui / Supabase(PostgreSQL) / Inngest

> 지금은 **Phase 1**: 운영 자동화·통합·콘텐츠. 결제 코어는 다루지 않는다(아래 절대 규칙 참조).
> 새 세션에서 기능 구현 전, 먼저 **현재 프로젝트 구조를 분석**하고 이 문서의 구조와 대조한 뒤 진행한다.

---

## 1. 절대 규칙 (위반 금지 — 최우선)

이 규칙은 다른 어떤 요구사항보다 우선한다.

- **결제·정산 로직을 직접 구현하지 않는다.** 간편결제·PG 연동·결제 처리(REQ002-03)는 **Phase 2**다. 이 영역이 필요해지면 코드를 짜지 말고 먼저 사람에게 "Phase 2 결제 영역"이라고 알린다.
- **주문 상태머신(결제완료→배송→취소/환불 전이)과 환불 금전 처리를 직접 구현하지 않는다.** 교환/환불(REQ001-03)에서 **모니터링·상태 조회 대시보드는 Phase 1**이지만, 실제 환불 금액 이동은 원본 채널/PG가 소유한다(Phase 2).
- **재고 동시성(주문 시점 재고 차감 경합)을 직접 제어하지 않는다.** 재고 통합(REQ003-02)은 "마스터 재고 → 채널 push/동기화"까지만 Phase 1이다. 주문 확정 시점의 실시간 차감은 각 채널이 소유한다.
- **회원등급별 구매권한·수량제한·시크릿 판매(REQ003-04)** 중 *진열·노출 제어*는 Phase 1이지만, *결제 단계의 구매 차단*은 체크아웃이 어디 있느냐에 달렸다 — 원본몰 체크아웃이면 그 몰의 기능, 신규 체크아웃이면 Phase 2. 임의로 결제 흐름을 만들지 말 것.
- **데이터는 한 방향으로만 흐른다.** 내 DB → (push) → 외부몰 / 외부몰 → (read-only 미러) → 내 DB. 외부몰 원본 데이터를 내 DB에서 고쳐 되쓰지 않는다.

### 소유권 경계

| 소유자 | 데이터 |
|---|---|
| **외부 채널** (카페24·b.stage·무신사·멤버십몰·유튜브쇼핑) | 발행된 상품, 주문, 고객, **결제, 정산** (진짜 원본) |
| **내 DB (Supabase)** | 발행 전 드래프트, 예약 스케줄, 콘텐츠, 검색 키워드 매핑, 마스터 재고, Pasto 오케스트레이션 상태, **멀티몰 통합 read-model** |

---

## 2. Phase 범위 (요구사항 매핑)

### Phase 1 — 지금 구현 (안전지대)

| REQ | 내용 | 성격 |
|---|---|---|
| REQ001-01 | 통합 주문 수집 (b.stage·무신사 → Gen.G에서 확인) | 집계 read-model |
| REQ001-02 | 출고 자동화 (국내/해외 영문·중문/멤버십몰 주문 수집→출고, Pasto 연동) | 오케스트레이션 |
| REQ001-03 (일부) | 교환/환불 **모니터링 통합 대시보드** | 조회 전용 |
| REQ002-01 | 배너/테마 관리자 직접 변경 (FTP·수동매핑 제거) | 콘텐츠 admin |
| REQ002-02 | CS FAQ 챗봇 (Claude API) | AI |
| REQ003-01 | 검색 키워드 자동 등록·매핑 | 데이터 |
| REQ003-02 | 재고 통합 업로드 → 전 채널 동기화(push) | 동기화 |
| REQ003-03 | 상품/배너 예약 (5분 단위, 상태값 세분화: 진열/판매/판매종료/노출종료) | 스케줄 |
| REQ003-04 (일부) | 자동 진열·노출 규칙, 회원등급별 **노출** 제어 | 진열 로직 |
| REQ003-05 | 자동 전시 규칙 + 프론트 UI(할인율 확대·롤링·가격표시 규칙) | UI |
| REQ004-01 | 상품 등록 표준 템플릿, 이미지 자동 리사이즈·크롭 | 어드민 UX |
| REQ005-01 | 유튜브 쇼핑 API 연동 | 채널 연동 |

### Phase 2 — 지금 구현하지 않음 (위험 영역)

- REQ002-03 결제 수단 추가 (젠지 전용 간편결제 + 글로벌/국내 PG 확장)
- REQ001-03 중 실제 환불 금전 처리
- REQ003-04 중 결제 단계 구매 차단 (신규 체크아웃 도입 시)
- 회원 계정 통합, 국가별 독립 결제, 독립 주문 코어

---

## 3. 도메인 컨텍스트

- **대상 플랫폼:** Gen.G Online Store (통합 운영 허브)
- **연동 채널:** 카페24(현행), b.stage, 무신사, 국내샵, 해외샵(영문·중문), 멤버십몰, 유튜브쇼핑
- **채널마다 연동 방식이 다르다:** API 제공 채널은 자동 폴링/웹훅, 미제공 채널은 **CSV 수동 업로드(반자동)**. 모든 소스를 공통 스키마로 정규화해 어드민은 출처를 모르게 한다.
- **생산 시스템:** Pasto (주문 → 데이터 변환 → Pasto API → 생산 → 출고)

---

## 4. 기술 규칙

- **TypeScript strict** 모드.
- **App Router** 사용.
- **Server Component가 기본**이다. Client Component는 상호작용·브라우저 API가 꼭 필요한 경우에만 사용하고, 파일 상단에 `"use client"`를 명시한다.
- import alias는 **`@/*`**.
- 재사용 UI는 **`src/components/ui`**, 레이아웃은 **`src/components/layout`**.
- 도메인별 기능은 **`src/features`**, 공통 유틸은 **`src/lib`**.
- **임의의 UI 스타일을 만들지 않는다.** 디자인 시스템 토큰을 우선 사용하고, shadcn/ui 컴포넌트를 기반으로 한다.
- **기존 컴포넌트가 있으면 반드시 재사용한다.** 새로 만들기 전에 `components/ui`·`features/*`를 먼저 확인한다.
- DB는 **Supabase PostgreSQL**. 접근은 `lib/supabase`를 통해서만. 스키마 변경은 `db/migrations` 마이그레이션으로만(임의 테이블 생성 금지).
- 백그라운드 잡·예약·외부 연동은 **Inngest 함수**로. API 라우트에서 직접 장시간 작업 금지.
- **환경변수·secret을 코드에 직접 작성하지 않는다.** `SUPABASE_SERVICE_ROLE_KEY` 등 서버 시크릿을 클라이언트 컴포넌트나 `NEXT_PUBLIC_`에 노출하지 않는다.
- **새 dependency 설치 전 반드시 이유를 설명**하고 승인받는다.

---

## 5. 디렉터리 구조

```
src/
├── app/
│   ├── (storefront)/          # 고객용 스토어프론트
│   ├── (admin)/               # 운영자 어드민
│   └── api/
│       └── inngest/route.ts   # Inngest 엔드포인트
├── components/
│   ├── ui/                    # 재사용 UI (shadcn 기반)
│   └── layout/                # 레이아웃 (헤더/사이드바/셸)
├── features/                  # 도메인별 기능 (feature 내부에 components/actions/queries/types)
│   ├── orders/                # REQ001 통합 주문 수집·출고·클레임 모니터링
│   ├── fulfillment/           # REQ001-02 Pasto 출고 오케스트레이션
│   ├── products/              # REQ003 상품 등록·드래프트·진열
│   ├── scheduling/            # REQ003-03 예약 발행(상품/배너/팝업, 상태 토글)
│   ├── inventory/             # REQ003-02 마스터 재고·채널 동기화
│   ├── content/               # REQ002-01 배너/테마 관리
│   ├── search/                # REQ003-01 검색 키워드 자동 매핑
│   ├── ingestion/             # CSV 수집·정규화 파이프라인
│   └── chatbot/               # REQ002-02 CS FAQ 챗봇
├── lib/                       # 공통 유틸
│   ├── supabase/              # DB 클라이언트
│   ├── inngest/               # Inngest 클라이언트·함수 등록
│   ├── integrations/          # 외부 채널 어댑터 (cafe24, bstage, musinsa, youtube, pasto)
│   └── utils/                 # 순수 유틸
└── db/
    ├── schema.sql
    └── migrations/
```

**경계가 폴더에 드러난다:** 외부와 통신하는 코드는 `lib/integrations` 어댑터에만, 정규화는 `features/ingestion`에만. 결제·정산 관련 폴더는 **의도적으로 없다** — 생기려 하면 경계를 넘는 신호다.

---

## 6. 핵심 구현 규칙

- **예약 발행 = 생성이 아니라 상태 토글.** 상품은 미리 미진열 상태로 채널에 생성해두고, 예약 시각에 진열/판매/판매종료/노출종료 **상태만 전환**한다. 5분 단위 스케줄은 Inngest가 담당하고, 배너·팝업 오픈을 같은 스케줄에 동기화한다. (REQ003-03)
- **CSV 인제스트는 멱등이 원칙.** 멱등키(채널ID + 원본주문번호) → 업서트 → **미리보기 → 확인 → 커밋**. 같은 파일 재업로드로 중복이 생기면 안 된다.
- **통합은 read-model.** `unified_orders`는 각 채널 주문의 정규화된 사본이다. 상태·결제의 원본은 채널에 있고, 여기서 되쓰지 않는다.
- **재고 통합은 push 방향.** 마스터 재고가 내 DB에 있고, 1회 업로드 → API 채널은 자동 push, CSV 채널은 내보내기. 주문 시점 실시간 차감은 각 채널 소유(위 절대 규칙).
- **외부 API 페이싱.** 카페24 API는 Leaky Bucket(버킷 10, 초당 1 회복). 예약이 특정 시각에 몰리면 터진다 — 대량 작업은 Inngest 큐로 초당 1건 페이싱 + 재시도.

---

## 7. 작업 방식

- 기능 구현 전 **현재 구조를 먼저 분석**하고, 이 문서의 규칙·구조와 대조한다.
- 다음 작업은 **plan mode로 계획을 먼저 제시**하고 승인받은 뒤 실행한다: 스키마 변경, 외부 API 쓰기(POST/PUT), 주문/결제/재고에 닿는 모든 것, 새 dependency 도입.
- 애매하면 추측하지 말고 질문한다.
- 결제·정산·주문상태머신·재고동시성 코드를 짜야 하는 상황이면 **멈추고 "Phase 2"임을 알린다.**

---

## 8. 명령어

- 개발: `pnpm dev`
- 빌드: `pnpm build`
- 타입체크: `pnpm typecheck`
- 린트: `pnpm lint`

---

*Phase 2(결제·회원통합·글로벌) 진입 시 1·2장의 경계를 개정한다. 그 전까지 경계는 유지된다.*
