import { baseHttp } from 'shared/http';
import { withToast } from 'shared/lib/withToast';
import type { SavingsProduct } from '../model/types';

/**
 * 적금 상품 목록 조회
 * @returns 적금 상품 목록
 * @description 에러 발생 시 자동으로 토스트 메시지를 표시합니다.
 */
export const getSavingsProducts = withToast(async (): Promise<SavingsProduct[]> => {
  const response = await baseHttp.get<SavingsProduct[]>('/api/savings-products');
  return response;
});
