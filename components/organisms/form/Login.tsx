import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
// Component
import { Form, Input } from "antd";
import { LoginButton } from "@/components/atoms/Button";
import { FormInputGroup } from "@/components/molecules/Group";
// Query
import { signin } from "@/models/apis/services/auth";
// Utilities
import { setAccessToken } from "@/utilities/token";

/** [Component] 로그인 폼(Form) */
export function LoginForm(): JSX.Element {
  // 라우터
  const router = useRouter();
  // 액세스 토큰
  // const setAccessToken: any = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 로그인 */
  const onSignin = useCallback(async (values: any): Promise<void> => {
    // 로그인 계정 식별 및 제한 처리
    if (values.email.match(/.+@tovdata.com$/) === null) {
      return Promise.resolve(alert("권한이 없습니다"));
    }
    // 로그인
    return signin(values.email, values.password).then(async (value: string | undefined): Promise<any> => {
      if (value) {
        setAccessToken(value);
        return router.push("/");
      } else {
        alert("[ERROR] Login error");
      }
    }).catch((): void => alert("이메일 또는 비밀번호가 일치하지 않습니다."));
  }, [setAccessToken]);

  return (
    <Form onFinish={onSignin}>
      <FormInputGroup label="이메일" name="email" rules={[{ required: true }]}>
        <Input />
      </FormInputGroup>
      <FormInputGroup label="비밀번호" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </FormInputGroup>
      <LoginButton>로그인</LoginButton>
    </Form>
  );
}