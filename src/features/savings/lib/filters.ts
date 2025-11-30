import type { SavingsProduct } from 'entities/savings/model/types';

/**
 * 상품 필터링 조건
 */
interface FilterConditions {
  monthlyAmount: string;
  period: number;
}

/**
 * 단일 상품이 조건에 맞는지 확인하는 함수 생성
 * @param conditions 필터링 조건
 * @returns 상품 필터링 함수
 */
export function createProductFilter(conditions: FilterConditions): (product: SavingsProduct) => boolean {
  const { monthlyAmount, period } = conditions;

  // 조건이 없으면 모든 상품 통과
  if (!monthlyAmount || !period) {
    return () => true;
  }

  const monthlyAmountNum = Number(monthlyAmount.replace(/,/g, ''));

  // 유효하지 않은 월 납입액이면 모든 상품 통과
  if (isNaN(monthlyAmountNum) || monthlyAmountNum <= 0) {
    return () => true;
  }

  return (product: SavingsProduct) => {
    // 월 납입액 필터링: minMonthlyAmount < 월 납입액 < maxMonthlyAmount
    const isMonthlyAmountValid =
      monthlyAmountNum > product.minMonthlyAmount && monthlyAmountNum < product.maxMonthlyAmount;

    // 저축 기간 필터링: availableTerms === 저축 기간
    const isPeriodValid = product.availableTerms === period;

    return isMonthlyAmountValid && isPeriodValid;
  };
}

/**
 * 입력 조건에 맞는 상품 목록 필터링
 * @param products 전체 상품 목록
 * @param conditions 필터링 조건
 * @returns 필터링된 상품 목록
 */
export function filterProductsByConditions(products: SavingsProduct[], conditions: FilterConditions): SavingsProduct[] {
  const filter = createProductFilter(conditions);
  return products.filter(filter);
}
