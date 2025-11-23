import type { SavingsProduct } from 'entities/savings/model/types';

/**
 * 추천 상품 목록 조회
 * @param products 상품 목록
 * @param limit 추천 상품 개수 (기본값: 2)
 * @returns 연 이자율이 가장 높은 상위 N개 상품
 */
export function getRecommendedProducts(products: SavingsProduct[], limit = 2): SavingsProduct[] {
  return [...products].sort((a, b) => b.annualRate - a.annualRate).slice(0, limit);
}
