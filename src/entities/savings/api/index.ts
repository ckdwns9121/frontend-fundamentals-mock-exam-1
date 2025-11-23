import { baseHttp } from '../../../shared/http';
import type { SavingsProduct } from '../model/type';

/**
 * 적금 상품 목록 조회
 * @returns 적금 상품 목록
 */
export async function getSavingsProducts(): Promise<SavingsProduct[]> {
  const response = await baseHttp.get<SavingsProduct[]>('/api/savings-products');
  return response;
}
