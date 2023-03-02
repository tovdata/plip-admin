// Component
import { Form, Input } from "antd";
import { LoginButton } from "@/components/atoms/Button";
import { FormInputGroup } from "@/components/molecules/Group";

/** [Component] 로그인 폼(Form) */
export function LoginForm(): JSX.Element {
  return (
    <Form>
      <FormInputGroup label="이메일" name="email">
        <Input />
      </FormInputGroup>
      <FormInputGroup label="비밀번호" name="password">
        <Input.Password />
      </FormInputGroup>
      <LoginButton>로그인</LoginButton>
    </Form>
  );
}