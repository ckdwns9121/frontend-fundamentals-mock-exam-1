import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient 인스턴스
 * @description React Query의 기본 설정을 포함한 QueryClient입니다.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
