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
function formatAmount(amount: number): string {
  return amount.toLocaleString('ko-KR');
}

/**
 * 적금 상품 아이템 컴포넌트
 * @description 적금 상품 정보를 표시하는 리스트 아이템입니다.
 */
export function SavingsProductItem({ product, selected = false, onClick }: SavingsProductItemProps) {
  const { name, interestRate, minAmount, maxAmount, period } = product;

  return (
    <ListRow
      contents={
        <ListRow.Texts
          type="3RowTypeA"
          top={name}
          topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
          middle={`연 이자율: ${interestRate}%`}
          middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
          bottom={`${formatAmount(minAmount)}원 ~ ${formatAmount(maxAmount)}원 | ${period}개월`}
          bottomProps={{ fontSize: 13, color: colors.grey600 }}
        />
      }
      right={selected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
      onClick={onClick}
    />
  );
}
