import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Component
const CompanyTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Company").then((module: any): any => module.CompanyTemplate));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  // 라우터
  const router = useRouter();
  // 회사 ID
  const { id: companyId } = router.query;

  return (
    <main>
      <CompanyTemplate companyId={companyId} />
    </main>
  );
}