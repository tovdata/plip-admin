import dynamic from "next/dynamic";
// Component
const LoginTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Login").then((module: any): any => module.LoginTemplate));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  return (
    <main>
      <LoginTemplate />
    </main>
  )
}
