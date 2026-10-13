-- 0005_content — 메인 화면 콘텐츠 (REQ002-01 배너/테마, REQ003-05 자동 전시)
--
-- 소유권: 내 DB. 지금 src/app/(storefront)/main-page-data.ts 에 상수로 박혀 있는
-- 배너·릴리즈·서브배너·진열 탭을 어드민에서 바꿀 수 있게 테이블로 옮긴다.
-- (FTP·수동매핑 제거가 REQ002-01 의 목적이다.)
--
-- 노출 기간은 starts_at / ends_at 으로 두고, 5분 단위 스케줄러(REQ003-03)가
-- is_active 를 토글한다 — 생성이 아니라 상태 토글이라는 원칙은 상품과 같다.

create table banners (
  id uuid primary key default gen_random_uuid(),
  -- 'main' = 메인 대형 배너(node 277:5042), 'sub' = 서브 배너(node 277:5199)
  slot text not null,
  -- 운영자가 줄바꿈 위치를 정하도록 배열로 둔다 (MainBannerSlide.titleLines 와 동일)
  title_lines text[] not null default '{}',
  subtitle text,
  href text not null,
  image_src text not null,
  image_alt text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default false,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint banners_slot_known check (slot in ('main', 'sub')),
  constraint banners_period_valid check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index banners_slot_idx on banners (slot, sort_order);

create trigger banners_set_updated_at
  before update on banners
  for each row execute function set_updated_at();

-- 서브 배너에 딸리는 상품 행 (node 277:5203)
create table banner_products (
  banner_id uuid not null references banners (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  sort_order integer not null default 0,

  primary key (banner_id, product_id)
);

-- 릴리즈 스트립 — node 277:5108
create table release_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  title text not null,
  href text not null,
  image_src text not null,
  image_alt text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default false,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger release_items_set_updated_at
  before update on release_items
  for each row execute function set_updated_at();

-- 진열 탭 — Most Popular(node 277:5147) / Product(node 277:5257)
-- 지금은 4개 탭이 전부 같은 상품 배열을 가리켜 탭을 눌러도 바뀌는 게 없다.
-- 탭별 상품을 분리해 실제로 다른 진열이 되게 한다.
create table showcase_tabs (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  label text not null,
  sort_order integer not null default 0,

  constraint showcase_tabs_section_known check (section in ('popular', 'product')),
  unique (section, label)
);

create table showcase_tab_products (
  tab_id uuid not null references showcase_tabs (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  sort_order integer not null default 0,

  primary key (tab_id, product_id)
);

-- ── RLS — 공개 읽기, 쓰기는 어드민(service role) ──────────────────────
alter table banners enable row level security;
alter table banner_products enable row level security;
alter table release_items enable row level security;
alter table showcase_tabs enable row level security;
alter table showcase_tab_products enable row level security;

create policy banners_public_read on banners
  for select using (is_active);
create policy banner_products_public_read on banner_products for select using (true);
create policy release_items_public_read on release_items
  for select using (is_active);
create policy showcase_tabs_public_read on showcase_tabs for select using (true);
create policy showcase_tab_products_public_read on showcase_tab_products for select using (true);
