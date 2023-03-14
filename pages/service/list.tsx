import dynamic from "next/dynamic";
// Component
const ServiceListTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Service").then((module: any): any => module.ServiceListTemplate));
// Data type
import type { ComponentType } from "react";

export default function Page() {
  return (
    <ServiceListTemplate />
  );
}