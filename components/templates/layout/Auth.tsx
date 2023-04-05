import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
// Component
import { Modal } from 'antd';

/** [Component] 인증 */
export const Authorization: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
  // 라우터
  const router = useRouter();
  // 팝업 상태
  const [open, setOpen] = useState<boolean>(false);

  /** [Event handler] 거부 확인 */
  const onDenied = useCallback((): void => !open ? setOpen(true) : undefined, []);
  /** [Event hook] 권한 없음에 대한 팝업 열기 */
  useEffect((): void => {
    if (open) {
      Modal.warn({
        title: "로그인이 만료되었습니다. 다시 로그인 해주세요.",
        onOk: (): Promise<boolean> => router.push('/login')
      });
    }
  }, [open]);

  return (
    <>{children ? React.cloneElement((children as JSX.Element), { onDenied }) : (<></>)}</>
  );
}