import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Component
const Template: ComponentType<any> = dynamic(() => import("@/components/templates/Home").then((module: any): any => module.Template));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  // 라우터
  const router = useRouter();
  // 회사 ID
  const { tabs } = router.query;

  return (
    <main>
      <Template tabs={tabs} />
    </main>
  );
}