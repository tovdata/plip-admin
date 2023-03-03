import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
// Component
import { Form, Input } from "antd";
import { LoginButton } from "@/components/atoms/Button";
import { FormInputGroup } from "@/components/molecules/Group";
// Query
import { signin } from "@/models/apis/services/auth";
// Status
import { accessTokenSelector } from "@/status";

/** [Component] 로그인 폼(Form) */
export function LoginForm(): JSX.Element {
  // 액세스 토큰
  const setAccessToken: any = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 로그인 */
  const onSignin = useCallback((values: any): Promise<void> => signin(values.email, values.password).then((value: string | undefined): void => {
    if (value) {
      setAccessToken(value);
    } else {
      console.error("[ERROR] Signin error");
    }
  }).catch((err: any): void => { console.error(err) }), [setAccessToken]);

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