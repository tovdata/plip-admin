import dynamic from "next/dynamic";
// Component
const CompanyListTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/Company").then((module: any): any => module.CompanyListTemplate));
// Data type
import type { ComponentType } from "react";

export default function Page({ ...props }) {
  return (
    <CompanyListTemplate { ...props } />
  );
}