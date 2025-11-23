import { Assets, colors, ListRow } from 'tosslib';
import type { SavingsProduct } from '../../model/types';

interface SavingsProductItemProps {
  product: SavingsProduct;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * 금액을 포맷팅합니다.
 * @param amount 금액
 * @returns 포맷팅된 금액 문자열
 */
function formatAmount(amount: number | undefined | null): string {
  if (amount == null || isNaN(amount)) {
    return '0';
  }
  return amount.toLocaleString('ko-KR');
}

/**
 * 적금 상품 아이템 컴포넌트
 * @description 적금 상품 정보를 표시하는 리스트 아이템입니다.
 */
export function SavingsProductItem({ product, selected = false, onClick }: SavingsProductItemProps) {
  const { name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms } = product;

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${annualRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${formatAmount(minMonthlyAmount)}원 ~ ${formatAmount(maxMonthlyAmount)}원 | ${availableTerms}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={selected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={onClick}
    />
  );
}
