import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Component
const ServiceTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Service").then((module: any): any => module.ServiceTemplate));
// Data type
import type { ComponentType } from "react";

export default function Page() {
  // 라우터
  const router = useRouter();
  // 회사 ID
  const { id: serviceId } = router.query;

  return (
    <main>
      <ServiceTemplate serviceId={serviceId} />
    </main>
  );
}