/**
 * 금액을 포맷팅합니다.
 * @param amount 금액
 * @param locale 포맷팅 로케일
 * @returns 포맷팅된 금액 문자열
 */
export function formatAmount(amount: number, locale = 'ko-KR'): string {
  return amount.toLocaleString(locale);
}
