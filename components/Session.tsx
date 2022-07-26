import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
// State
import { accessTokenSelector } from '@/models/session';

/** [Component] 섹션 (액세스 토큰 보유 결과에 따른 처리) */
const Session: React.FC<any> = ({ children }): JSX.Element => {
  // 액세스 토큰 조회
  const { state, contents } = useRecoilValueLoadable(accessTokenSelector);
  // 자식 컴포넌트 상태
  const [components, setComponents] = useState<JSX.Element>(<></>);

  // 렌더링 완료 시, 처리
  useEffect(() => {
    if (state === 'hasValue') {
      if (contents === undefined) {
        Router.push('/signin');
      } else {
        setComponents(children);
      }
    }
  }, [state, contents]);

  // 결과 반환
  return (<>{components}</>);
}

export default Session;