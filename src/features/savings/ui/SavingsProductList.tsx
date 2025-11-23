import { ListRow } from 'tosslib';
import { SavingsProductItem } from 'entities/savings/ui/SavingsProductItem/SavingProductItem';
import type { SavingsProduct } from 'entities/savings/model/types';

interface SavingsProductListProps {
  isLoading: boolean;
  isError: boolean;
  products: SavingsProduct[];
  selectedProductId: string | null;
  onProductSelect: (productId: string) => void;
}

/**
 * 적금 상품 목록 컴포넌트
 * @description 로딩, 에러, 빈 상태 및 상품 목록을 표시하는 컴포넌트입니다.
 */
export function SavingsProductList({
  isLoading,
  isError,
  products,
  selectedProductId,
  onProductSelect,
}: SavingsProductListProps) {
  if (isLoading) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="로딩 중..." />} />;
  }

  if (isError) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품 목록을 불러오는 중 오류가 발생했습니다." />} />;
  }

  if (products.length === 0) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <SavingsProductItem
          key={product.id}
          product={product}
          selected={selectedProductId === product.id}
          onClick={() => {
            onProductSelect(product.id);
          }}
        />
      ))}
    </>
  );
}
