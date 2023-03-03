import dynamic from "next/dynamic";
// Component
const DashboardTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Dashboard").then((module: any): any => module.DashboardTemplate));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  return (
    <main>
      <DashboardTemplate />
    </main>
  );
}