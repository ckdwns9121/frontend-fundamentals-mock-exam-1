import { Border, colors, ListHeader, ListRow, Spacing } from 'tosslib';
import { SavingsProductItem } from '../../../entities/savings/ui/SavingsProductItem';
import { calculateDifference, calculateExpectedAmount, calculateRecommendedMonthlyAmount } from '../lib/calculations';
import { formatAmount } from 'shared/lib/format';
import type { SavingsProduct } from '../../../entities/savings/model/types';

interface CalculationResultProps {
  targetAmount: string;
  monthlyAmount: string;
  period: number;
  selectedProduct: SavingsProduct | null;
  recommendedProducts: SavingsProduct[];
  selectedProductId: string | null;
  onProductSelect: (productId: string) => void;
}

/**
 * 계산 결과 컴포넌트
 * @description 선택한 적금 상품에 대한 계산 결과를 표시합니다.
 */
export function CalculationResult({
  targetAmount,
  monthlyAmount,
  period,
  selectedProduct,
  recommendedProducts,
  selectedProductId,
  onProductSelect,
}: CalculationResultProps) {
  // 상품을 선택하지 않은 경우
  if (!selectedProduct) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />;
  }

  const targetAmountNum = Number(targetAmount.replace(/,/g, '')) || 0;
  const monthlyAmountNum = Number(monthlyAmount.replace(/,/g, '')) || 0;
  const { annualRate } = selectedProduct;

  // 예상 수익 금액 계산
  const expectedAmount = calculateExpectedAmount(monthlyAmountNum, period, annualRate);

  // 목표 금액과의 차이 계산
  const difference = calculateDifference(targetAmountNum, expectedAmount);

  // 추천 월 납입 금액 계산
  const recommendedMonthlyAmount = calculateRecommendedMonthlyAmount(targetAmountNum, period, annualRate);

  return (
    <>
      <Spacing size={8} />

      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="예상 수익 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatAmount(Math.round(expectedAmount))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="목표 금액과의 차이"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatAmount(Math.round(difference))}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />
      <ListRow
        contents={
          <ListRow.Texts
            type="2RowTypeA"
            top="추천 월 납입 금액"
            topProps={{ color: colors.grey600 }}
            bottom={`${formatAmount(recommendedMonthlyAmount)}원`}
            bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
          />
        }
      />

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      {recommendedProducts.map(product => (
        <SavingsProductItem
          key={product.id}
          product={product}
          selected={selectedProductId === product.id}
          onClick={() => onProductSelect(product.id)}
        />
      ))}
    </>
  );
}
