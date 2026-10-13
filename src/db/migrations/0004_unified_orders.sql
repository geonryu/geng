-- 0004_unified_orders — 멀티몰 통합 주문 read-model (REQ001-01)
--
-- 소유권: **외부 채널**. 이 테이블은 각 채널 주문의 정규화된 사본일 뿐이다.
-- 상태·결제·정산의 원본은 채널에 있고, 여기서 고쳐 되쓰지 않는다 (AGENTS.md §1·§6).
--
-- 주문 상태머신(결제완료→배송→취소/환불 전이)과 환불 금전 처리는 Phase 2 다.
-- 여기서 status 는 채널이 준 값을 그대로 담는 문자열이며, 앱이 전이시키지 않는다.
--
-- 쓰기는 동기화 잡(service role)만 한다. 아래 트리거가 그 외의 쓰기를 막는다.

create table unified_orders (
  id uuid primary key default gen_random_uuid(),
  channel sales_channel not null,
  -- 멱등키: 채널ID + 원본주문번호 (AGENTS.md §6 CSV 인제스트 원칙과 동일)
  external_order_no text not null,
  member_id uuid references members (id) on delete set null,
  orderer_name text,
  ordered_at timestamptz not null,
  -- 채널이 준 상태 문자열을 그대로 담는다. 내가 정의한 enum 이 아니다.
  status text not null,
  total_amount integer not null check (total_amount >= 0),
  currency text not null default 'KRW',
  synced_at timestamptz not null default now(),

  unique (channel, external_order_no)
);

create index unified_orders_member_idx on unified_orders (member_id, ordered_at desc);

create table unified_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references unified_orders (id) on delete cascade,
  -- 내 상품과 매칭되면 연결하고, 안 되면 이름만 남긴다.
  product_id uuid references products (id) on delete set null,
  product_name text not null,
  option_label text,
  quantity integer not null check (quantity > 0),
  unit_amount integer not null check (unit_amount >= 0),
  thumbnail_src text
);

create index unified_order_items_order_idx on unified_order_items (order_id);

-- ── 되쓰기 차단 ───────────────────────────────────────────────────────
-- 원본은 채널에 있다. service role(동기화 잡) 외의 쓰기는 명시적으로 거부한다.
create function reject_unified_order_write() returns trigger
language plpgsql
as $$
begin
  if current_setting('request.jwt.claims', true)::jsonb ->> 'role' is distinct from 'service_role' then
    raise exception
      '통합 주문은 외부 채널 소유의 read-only 미러입니다. 동기화 잡으로만 적재하세요 (AGENTS.md §1).';
  end if;
  return new;
end;
$$;

create trigger unified_orders_readonly
  before insert or update or delete on unified_orders
  for each row execute function reject_unified_order_write();

create trigger unified_order_items_readonly
  before insert or update or delete on unified_order_items
  for each row execute function reject_unified_order_write();

-- ── RLS — 본인 주문만 조회 ────────────────────────────────────────────
alter table unified_orders enable row level security;
alter table unified_order_items enable row level security;

create policy unified_orders_select_own on unified_orders
  for select using (auth.uid() = member_id);

create policy unified_order_items_select_own on unified_order_items
  for select using (
    exists (
      select 1 from unified_orders o
      where o.id = order_id and o.member_id = auth.uid()
    )
  );
