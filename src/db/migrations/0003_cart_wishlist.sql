-- 0003_cart_wishlist — 장바구니 · 찜
--
-- 소유권: 내 DB. 장바구니는 "주문"이 아니다 — 결제·주문 확정은 Phase 2 이고
-- 여기서는 담아두기까지만 다룬다 (AGENTS.md §1 절대 규칙).
--
-- 비회원 장바구니는 member_id 가 null 이고, httpOnly 쿠키에 담긴 cart id 로 찾는다.
-- 로그인 시 비회원 카트를 회원 카트로 합친다 (merge 는 서버 액션이 담당).

create table carts (
  id uuid primary key default gen_random_uuid(),
  member_id uuid unique references members (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger carts_set_updated_at
  before update on carts
  for each row execute function set_updated_at();

-- 장바구니 탭 — 시안의 국내배송 / 해외배송 (node 277:7622)
create type shipping_scope as enum ('domestic', 'overseas');

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references carts (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  option_id uuid references product_options (id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  scope shipping_scope not null default 'domestic',
  created_at timestamptz not null default now(),

  -- 같은 상품·옵션을 다시 담으면 행이 늘지 않고 수량만 올라간다.
  unique (cart_id, product_id, option_id)
);

create index cart_items_cart_idx on cart_items (cart_id);

create table wishlists (
  member_id uuid not null references members (id) on delete cascade,
  product_id uuid not null references products (id) on delete cascade,
  created_at timestamptz not null default now(),

  primary key (member_id, product_id)
);

-- ── RLS ──────────────────────────────────────────────────────────────
alter table carts enable row level security;
alter table cart_items enable row level security;
alter table wishlists enable row level security;

-- 회원 카트는 본인만. 비회원 카트(member_id is null)는 쿠키로만 접근하므로
-- anon 키로는 열지 않고 서버(service role)를 거친다.
create policy carts_own on carts
  for all using (auth.uid() = member_id) with check (auth.uid() = member_id);

create policy cart_items_own on cart_items
  for all using (
    exists (select 1 from carts c where c.id = cart_id and c.member_id = auth.uid())
  ) with check (
    exists (select 1 from carts c where c.id = cart_id and c.member_id = auth.uid())
  );

create policy wishlists_own on wishlists
  for all using (auth.uid() = member_id) with check (auth.uid() = member_id);
