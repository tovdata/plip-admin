import dynamic from "next/dynamic";
// Component
const LoginForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Login").then((module: any): any => module.LoginForm), { loading: () => (<></>), ssr: false });
// Data type
import type { ComponentType } from "react";

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