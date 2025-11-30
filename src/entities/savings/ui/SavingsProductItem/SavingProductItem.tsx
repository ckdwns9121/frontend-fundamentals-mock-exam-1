import { Assets, colors, ListRow } from 'tosslib';
import { formatAmount } from 'shared/lib/format';
import type { SavingsProduct } from '../../model/types';

interface SavingsProductItemProps {
  product: SavingsProduct;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * 적금 상품 아이템 컴포넌트
 * @description 적금 상품 정보를 표시하는 리스트 아이템입니다.
 */
export function SavingsProductItem({ product, selected = false, onClick }: SavingsProductItemProps) {
  const { name, annualRate, minMonthlyAmount, maxMonthlyAmount, availableTerms } = product;

  return (
    <button
      onClick={onClick}
      style={{
        all: 'unset', // 버튼 기본 스타일 전부 제거
        display: 'contents', // 버튼의 레이아웃 박스를 없애 fragment처럼 동작
        cursor: 'pointer',
      }}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
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
      />
    </button>
  );
}
