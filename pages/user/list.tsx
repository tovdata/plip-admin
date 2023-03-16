import dynamic from "next/dynamic";
// Component
const UserListTemplate: ComponentType<any> = dynamic(() => import("@/components/templates/User").then((module: any): any => module.UserListTemplate));
// Data type
import type { ComponentType } from "react";

export default function Page() {
  return (
    <UserListTemplate />
  );
}