import dynamic from "next/dynamic";
// Component
const CompanyTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Company").then((module: any): any => module.CompanyTemplate));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  return (
    <main>
      <CompanyTemplate />
    </main>
  );
}