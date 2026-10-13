-- 0006_product_category — 상품 분류
--
-- GNB(node 277:6032)의 NEW / BEST / SALE / PRO / GenRang / SHOP 중
-- PRO·GenRang 은 분류이고 나머지는 정렬·필터다. 분류만 컬럼으로 둔다.
--
-- NEW  = 최신 등록순
-- SALE = original_price 가 있는 상품 (할인 중)
-- BEST = 판매량 기준이어야 하지만 주문 데이터가 아직 안 쌓여, 지금은 최신순으로 둔다.
--        unified_orders 적재가 시작되면 집계로 교체한다.

create type product_category as enum (
  'pro',      -- Pro Kit (유니폼·저지·마킹키트)
  'genrang',  -- GenRang 캐릭터 굿즈
  'goods',    -- 일반 굿즈
  'collab'    -- 콜라보
);

alter table products add column category product_category;

create index products_category_idx on products (category) where category is not null;

comment on column products.category is
  'GNB 분류. NEW/BEST/SALE 은 분류가 아니라 정렬·필터라 컬럼으로 두지 않는다.';
