import dynamic from "next/dynamic";
// Component
const Template: ComponentType<any> = dynamic(() => import("@/components/templates/Home").then((module: any): any => module.Template));
// Data type
import type { ComponentType } from "react";

export default function Home() {
  return (
    <main>
      <Template />
    </main>
  );
}