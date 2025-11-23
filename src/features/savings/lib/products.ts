import { findById } from 'shared/lib/utils';
import type { SavingsProduct } from 'entities/savings/model/types';

/**
 * ID로 적금 상품 찾기
 * @param products 상품 목록
 * @param productId 찾을 상품 ID
 * @returns 찾은 상품 또는 null
 */
export function findProductById(products: SavingsProduct[], productId: string | null): SavingsProduct | null {
  return findById<SavingsProduct>(products, productId);
}
