import { LoginForm } from "@/components/organisms/form/Login";

/** [Component] 로그인 템플릿 */
export function LoginTemplate(): JSX.Element {
  return (
    <div className="mx-auto w-full sm:w-96">
      <LoginForm />
    </div>
  );
}