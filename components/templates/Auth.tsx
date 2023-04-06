import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
// Component
import { Modal } from 'antd';
// Status
import { useAuthPopupValue } from '@/models/jotai/atoms/authPopup';

/** [Component] 인증 */
export const Authorization: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
  // 라우터
  const router = useRouter();
  // 팝업 표시 상태
  const open = useAuthPopupValue();

  /** [Event hook] 권한 없음에 대한 팝업 열기 */
  useEffect((): void => {
    if (open) {
      Modal.warn({
        centered: true,
        onOk: (): Promise<boolean> => router.push('/login'),
        title: "로그인이 만료되었습니다. 다시 로그인 해주세요."
      });
    }
  }, [open]);

  return (
    <>{children}</>
  );
}

export default Authorization;