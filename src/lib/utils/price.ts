/**
 * 금액 포맷 유틸.
 *
 * 금액은 저장·계산 단계에서 항상 **원 단위 정수**로 다루고, 포맷은 표시 직전에만 한다.
 * 시안 데이터가 `"189,000원"` 문자열이던 탓에 파싱/포맷 헬퍼가
 * cart-table·product-purchase-panel에 중복돼 있었고, DB 연동 시 전부 깨지는 구조였다.
 * 그 중복을 여기로 모은다.
 */

/** 1원 단위 정수를 천 단위 구분 문자열로. 예: 189000 → "189,000" */
export function formatWon(won: number): string {
  return Math.round(won).toLocaleString("ko-KR");
}

/** 단위까지 붙인 표기. 예: 189000 → "189,000원" */
export function formatWonUnit(won: number): string {
  return `${formatWon(won)}원`;
}

/**
 * 할인율 표기. 예: (34300, 49000) → "30%"
 * 시안이 정가·판매가와 함께 할인율을 따로 적어 두던 것을 계산으로 대체한다.
 * 정가가 없거나 판매가 이하면 할인이 아니므로 null.
 */
export function calcSaleRate(price: number, originalPrice?: number): string | null {
  if (!originalPrice || originalPrice <= price) return null;
  return `${Math.round((1 - price / originalPrice) * 100)}%`;
}
