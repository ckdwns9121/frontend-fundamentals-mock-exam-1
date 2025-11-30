import { SavingsProductItem } from 'entities/savings/ui/SavingsProductItem/SavingProductItem';
import type { SavingsProduct } from 'entities/savings/model/types';
import { useSavingsProducts } from 'entities/savings/api';

interface SavingsProductListProps {
  filter?: (product: SavingsProduct) => boolean;
  selectedProductId: string | null;
  onProductSelect: (productId: string) => void;
}

/**
 * 적금 상품 목록 컴포넌트
 * @description 로직은 부모에서 주입받고, 표현만 담당합니다.
 * filter 함수를 받아서 useSuspenseQuery의 select 옵션으로 필터링합니다.
 */
export function SavingsProductList({ filter, selectedProductId, onProductSelect }: SavingsProductListProps) {
  const { data: products } = useSavingsProducts<SavingsProduct[]>(raw => {
    if (filter) {
      return raw.filter(filter);
    }
    return raw;
  });

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
