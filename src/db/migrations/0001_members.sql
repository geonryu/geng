-- 0001_members — 자체 회원 도메인
--
-- 소유권: 내 DB (쓰기 가능).
-- AGENTS.md §1 은 원래 "회원 계정 통합"을 Phase 2 로 두고 고객 데이터의 원본을
-- 외부 채널에 뒀다. 독립 플랫폼 전환 결정에 따라 자체 회원을 Phase 1 로 끌어온다.
-- 외부몰 회원은 여기서 "원본"이 아니라 channel_member_links 를 통한 매핑으로만 붙는다.
--
-- 인증(비밀번호·세션)은 Supabase Auth(auth.users)가 소유한다. 이 테이블은 프로필만 든다.

create type member_type as enum ('personal', 'business', 'foreigner');
create type member_gender as enum ('male', 'female');

-- 연동 채널. 상품·주문 테이블에서도 함께 쓴다.
create type sales_channel as enum (
  'cafe24',      -- 현행 메인몰
  'bstage',
  'musinsa',
  'membership',  -- 멤버십몰
  'youtube',     -- 유튜브 쇼핑
  'own'          -- 젠지 자체 플랫폼
);

create table members (
  id uuid primary key references auth.users (id) on delete cascade,
  member_type member_type not null default 'personal',
  -- 회원가입 폼의 "아이디" (영문소문자/숫자 4~16자). 로그인 식별자로 쓴다.
  login_id text not null unique,
  name text not null,
  email text not null,
  birth_date date,
  gender member_gender,
  -- 통신사 번호 + 중간 + 끝자리를 하이픈 없이 합쳐 저장한다.
  phone text,
  postcode text,
  address text,
  address_detail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint members_login_id_format check (login_id ~ '^[a-z0-9]{4,16}$')
);

create index members_email_idx on members (email);

-- 약관 동의 이력 — 회원가입 폼의 TermsAgreement 5종
-- (service / privacy 는 필수, marketing / sms / email 은 선택)
create table member_agreements (
  id bigint generated always as identity primary key,
  member_id uuid not null references members (id) on delete cascade,
  term_key text not null,
  agreed boolean not null,
  agreed_at timestamptz not null default now(),

  unique (member_id, term_key),
  constraint member_agreements_term_key_known
    check (term_key in ('service', 'privacy', 'marketing', 'sms', 'email'))
);

create table member_addresses (
  id bigint generated always as identity primary key,
  member_id uuid not null references members (id) on delete cascade,
  label text,
  recipient text not null,
  phone text,
  postcode text not null,
  address text not null,
  address_detail text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index member_addresses_member_idx on member_addresses (member_id);

-- 한 회원당 기본 배송지는 하나만.
create unique index member_addresses_one_default_idx
  on member_addresses (member_id)
  where is_default;

-- 외부몰 회원 매핑 — 방향은 외부몰 → 내 DB 단방향이다.
-- 외부몰의 회원 원본을 여기서 고쳐 되쓰지 않는다 (AGENTS.md §1 데이터 흐름).
create table channel_member_links (
  id bigint generated always as identity primary key,
  member_id uuid not null references members (id) on delete cascade,
  channel sales_channel not null,
  external_member_id text not null,
  linked_at timestamptz not null default now(),
  synced_at timestamptz,

  unique (channel, external_member_id),
  unique (member_id, channel)
);

-- ── updated_at 자동 갱신 ─────────────────────────────────────────────
create function set_updated_at() returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger members_set_updated_at
  before update on members
  for each row execute function set_updated_at();

-- ── RLS — 본인 행만 ──────────────────────────────────────────────────
alter table members enable row level security;
alter table member_agreements enable row level security;
alter table member_addresses enable row level security;
alter table channel_member_links enable row level security;

create policy members_select_own on members
  for select using (auth.uid() = id);
create policy members_insert_own on members
  for insert with check (auth.uid() = id);
create policy members_update_own on members
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy member_agreements_own on member_agreements
  for all using (auth.uid() = member_id) with check (auth.uid() = member_id);

create policy member_addresses_own on member_addresses
  for all using (auth.uid() = member_id) with check (auth.uid() = member_id);

-- 매핑은 본인 것만 읽을 수 있고, 적재는 service role(동기화 잡)만 한다.
create policy channel_member_links_select_own on channel_member_links
  for select using (auth.uid() = member_id);
