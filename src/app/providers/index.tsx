import { QueryClientProvider } from '@tanstack/react-query';
import { GlobalPortal, GlobalStyles } from 'tosslib';
import { ReactNode } from 'react';
import { queryClient } from '../queryClient';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * 애플리케이션 Provider 컴포넌트
 * @description 모든 전역 Provider를 포함합니다.
 * - QueryClientProvider: React Query 설정
 * - GlobalStyles: 전역 스타일
 * - GlobalPortal.Provider: Portal 관리
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <GlobalPortal.Provider>{children}</GlobalPortal.Provider>
    </QueryClientProvider>
  );
}
