-- 0002_products — 상품 도메인
--
-- 소유권이 두 갈래로 갈린다 (AGENTS.md §1 소유권 경계):
--   source = 'draft'  → 발행 전 드래프트. 내 DB 가 원본이고 자유롭게 쓴다.
--   source = 'mirror' → 외부몰에 이미 발행된 상품의 read-only 사본.
--                       external_channel / external_product_id 가 원본을 가리킨다.
--                       동기화 잡(service role)만 쓰고, 앱에서 고쳐 되쓰지 않는다.
--
-- 금액은 전부 원 단위 정수다 (src/lib/utils/price.ts 와 같은 모델).

create type product_source as enum ('draft', 'mirror');

-- REQ003-03 예약 발행의 상태값 세분화 — 진열/판매/판매종료/노출종료.
-- 예약은 "생성"이 아니라 이 상태의 토글이다 (AGENTS.md §6).
create type product_status as enum (
  'draft',       -- 작성 중, 미진열
  'display',     -- 진열(노출) 됨
  'on_sale',     -- 판매 중
  'sale_ended',  -- 판매종료 (노출은 유지)
  'hidden'       -- 노출종료
);

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  -- 판매가 (원). 정가는 할인이 있을 때만 채운다 — 할인율은 두 값에서 계산한다.
  price integer not null check (price >= 0),
  original_price integer check (original_price >= 0),
  shipping_notice text,
  thumbnail_src text,
  -- 상품설명 탭 헤드카피 (node 290:14780). 줄바꿈 위치를 운영자가 정하도록 배열로 둔다.
  detail_heading text[] not null default '{}',
  highlights text[] not null default '{}',
  detail_image_src text,

  source product_source not null default 'draft',
  status product_status not null default 'draft',
  -- 마스터 재고 (REQ003-02). 채널로 push 하는 기준값이며 **표시용**이다.
  -- 주문 시점의 실시간 차감은 각 채널이 소유한다 (AGENTS.md §1 재고 동시성).
  stock integer check (stock >= 0),

  external_channel sales_channel,
  external_product_id text,
  synced_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint products_original_price_gt_price
    check (original_price is null or original_price > price),
  -- 미러 상품은 반드시 원본을 가리켜야 한다.
  constraint products_mirror_needs_origin
    check (source <> 'mirror' or (external_channel is not null and external_product_id is not null)),
  unique (external_channel, external_product_id)
);

create index products_status_idx on products (status);
create index products_source_idx on products (source);

create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- 옵션 — 시안은 사이즈(S~2XL)뿐이지만 옵션별 추가금을 쓸 수 있게 price 를 따로 둔다.
create table product_options (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  price integer not null check (price >= 0),
  stock integer check (stock >= 0),
  sort_order integer not null default 0,

  unique (product_id, label)
);

create index product_options_product_idx on product_options (product_id, sort_order);

-- 갤러리 — node 277:8600
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  src text not null,
  alt text not null default '',
  sort_order integer not null default 0
);

create index product_images_product_idx on product_images (product_id, sort_order);

-- 스펙 표 — node 290:14795
create table product_specs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  value text not null,
  sort_order integer not null default 0
);

create index product_specs_product_idx on product_specs (product_id, sort_order);

-- 하단 안내 아코디언 — node 277:8617 외
create table product_guides (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,
  content text not null,
  sort_order integer not null default 0
);

create index product_guides_product_idx on product_guides (product_id, sort_order);

-- 상품후기 — node 277:5753
create table product_reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  -- 외부몰에서 미러된 후기는 작성자가 내 회원이 아닐 수 있다.
  member_id uuid references members (id) on delete set null,
  author text not null,
  option_label text,
  title text,
  body text not null,
  image_src text,
  created_at timestamptz not null default now()
);

create index product_reviews_product_idx on product_reviews (product_id, created_at desc);

create type question_status as enum ('pending', 'answered');

-- 상품문의 — node 277:5800 외. secret 글은 작성자와 운영자만 본문을 본다.
create table product_questions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  member_id uuid references members (id) on delete set null,
  status question_status not null default 'pending',
  secret boolean not null default false,
  title text not null,
  author text not null,
  body text,
  answer_body text[],
  answered_at timestamptz,
  created_at timestamptz not null default now(),

  constraint product_questions_answered_has_body
    check (status <> 'answered' or answer_body is not null)
);

create index product_questions_product_idx on product_questions (product_id, created_at desc);

-- ── RLS ──────────────────────────────────────────────────────────────
-- 진열 데이터는 공개 읽기, 쓰기는 service role(어드민·동기화 잡)만.
alter table products enable row level security;
alter table product_options enable row level security;
alter table product_images enable row level security;
alter table product_specs enable row level security;
alter table product_guides enable row level security;
alter table product_reviews enable row level security;
alter table product_questions enable row level security;

create policy products_public_read on products
  for select using (status in ('display', 'on_sale', 'sale_ended'));

create policy product_options_public_read on product_options for select using (true);
create policy product_images_public_read on product_images for select using (true);
create policy product_specs_public_read on product_specs for select using (true);
create policy product_guides_public_read on product_guides for select using (true);
create policy product_reviews_public_read on product_reviews for select using (true);

-- 후기는 로그인 회원이 본인 이름으로만 쓴다.
create policy product_reviews_insert_own on product_reviews
  for insert with check (auth.uid() = member_id);

-- 비밀글은 목록에 제목만 노출되고 본문은 작성자만 — 본문 가리기는 조회 레이어에서 한다.
create policy product_questions_public_read on product_questions for select using (true);
create policy product_questions_insert_own on product_questions
  for insert with check (auth.uid() = member_id);
