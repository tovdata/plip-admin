import Router from 'next/router';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
// Component
import { Button, Divider, Form, Input } from 'antd';
import { StyledForm } from '@/components/styles/Signin';
import { InputGroup } from '@/components/Input';
// Query
import { signin, signout, validateAdmin } from '@/models/apis/signin';
// State
import { accessTokenSelector } from '@/models/session';
// Util
import { errorNotification, warningNotification } from 'utils/notification';
import { extractUserId } from 'utils/util';


/** [Component] 로그인 */
const Signin: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
  const setAccessToken = useSetRecoilState(accessTokenSelector);
  // Form 객체
  const [form] = Form.useForm();

  /** [Event handler] 로그인 */
  const onSignin = useCallback(async () => {
    // API 호출
    const response = await signin(form.getFieldValue('email'), form.getFieldValue('password'));
    // 결과 처리
    if (response.result && response.data) {
      setAccessToken(response.data);
      // 액세스 토큰 저장까지 대기
      setTimeout(async () => {
        // 사용자 ID 추출
        const userId: string = extractUserId(response.data);
        // 관리자 권한 확인
        const isAdmin: boolean = await validateAdmin(userId);
        // 권한에 따른 처리
        if (isAdmin) {
          Router.push('/');
        } else {
          // 로그아웃
          await signout();
          // 쿠키 삭제
          setAccessToken('');
          // 알림
          errorNotification('권한 없음', '관리자 권한이 없습니다.');
        }
      }, 250);
    } else {
      warningNotification('로그인 실패', '이메일 또는 비밀번호가 일치하지 않습니다.');
    }
  }, [form, setAccessToken]);

  // 컴포넌트 반환
  return (
    <StyledForm>
      <h2 className="title">로그인</h2>
      <Form form={form} onFinish={onSignin}>
        <InputGroup label='이메일'>
          <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
            <Input placeholder='nickname@company.com' />
          </Form.Item>
        </InputGroup>
        <InputGroup label='비밀번호'>
          <Form.Item name='password' rules={[{ required: true, message: '비밀번호을 입력해주세요.' }]}>
            <Input.Password />
          </Form.Item>
        </InputGroup>
        <Divider dashed />
        <Button className='submit' htmlType='submit' type='primary'>로그인</Button>
      </Form>
    </StyledForm>
  );
}

export default Signin;