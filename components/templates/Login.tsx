import { LoginForm } from "@/components/organisms/form/Login";

/** [Component] 로그인 템플릿 */
export function LoginTemplate(): JSX.Element {
  return (
    <div className="flex items-center h-screen justify-center w-full">
      <div className="mx-auto w-full sm:w-72">
        <LoginForm />
      </div>
    </div>
  );
}