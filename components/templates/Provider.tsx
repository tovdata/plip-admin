import React from 'react';
// Component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Data
import { ERROR_CODE } from "@/models/apis/utilities/error";
// Status
import { useAuthPopupSetter } from '@/models/jotai/atoms/authPopup';

/** [Component] 인증 */
const GlobalQueryProvider: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
  // 로그인 권한에 따른 팝업 상태
  const setAuthPopup = useAuthPopupSetter();
  // Query client
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: (err: unknown): void => {
          // 권한 인증 처리
          if ((err as Error).name === ERROR_CODE['401']) {
            setAuthPopup({ open: true });
          }
        },
        retry: (failureCount: number, err: unknown): boolean => {
          // 권한 인증 오류일 경우, 재시도하지 않음
          if ((err as Error).name === ERROR_CODE['401']) return false;
          // 재시도 최대 1회
          else if (failureCount > 0) return false;
          else return true;
        },
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default GlobalQueryProvider;