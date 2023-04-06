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
  // 로그인 권한에 따른 팝업 상태
  const { open }  = useAuthPopupValue();

  useEffect((): void => {
    if (open) {
      Modal.warn({
        title: "로그인이 만료되었습니다. 다시 로그인 해주세요.",
        onOk: (): Promise<boolean> => router.push('/login')
      });
    }
  }, [open]);

  return (
    <>{children ? React.cloneElement((children as JSX.Element)) : (<></>)}</>
  );
}