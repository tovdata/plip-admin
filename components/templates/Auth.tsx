import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
// Component
import { Modal } from 'antd';
// Status
import { unauthorizationSelector } from '@/models/status';

/** [Component] 인증 */
export const Authorization: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
  // 라우터
  const router = useRouter();
  // 권한없음 여부
  const unauthorization = useRecoilValue<boolean>(unauthorizationSelector);

  /** [Event hook] 권한 없음에 대한 팝업 열기 */
  useEffect((): void => {
    if (unauthorization) {
      Modal.warn({
        centered: true,
        onOk: (): Promise<boolean> => router.push('/login'),
        title: "로그인이 만료되었습니다. 다시 로그인 해주세요."
      });
    }
  }, [unauthorization]);

  return (
    <>{children}</>
  );
}

export default Authorization;