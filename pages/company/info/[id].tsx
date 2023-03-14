import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Component
const CompanyInfoTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Company").then((module: any): any => module.CompanyInfoTemplate));
// Data type
import type { ComponentType } from "react";

export default function Page() {
  // 라우터
  const router = useRouter();
  // 회사 ID
  const { id: companyId } = router.query;

  return (
    <CompanyInfoTemplate companyId={companyId} />
  );
}