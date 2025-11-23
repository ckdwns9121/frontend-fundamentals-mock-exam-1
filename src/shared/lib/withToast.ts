import { isHttpError } from 'tosslib';
import { showToast } from './toast';

/**
 * API 함수를 감싸서 에러 발생 시 토스트 메시지를 표시하는 고차함수
 * @param apiFn API 함수
 * @returns 에러 처리와 토스트 메시지가 포함된 API 함수
 * @example
 * ```ts
 * const getProducts = withToast(async () => {
 *   return await baseHttp.get('/api/products');
 * });
 * ```
 */
export function withToast<T extends (...args: any[]) => Promise<any>>(apiFn: T): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await apiFn(...args);
    } catch (error) {
      if (isHttpError(error)) {
        // HTTP 에러인 경우
        const status = error.status || 500;
        const message = error.message || '요청 처리 중 오류가 발생했습니다.';
        showToast(`[${status}] ${message}`, 'warn');
      } else {
        // 기타 에러인 경우
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        showToast(errorMessage, 'warn');
      }

      // 에러를 재throw하여 호출자가 처리할 수 있도록 함
      throw error;
    }
  }) as T;
}
