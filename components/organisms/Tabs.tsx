import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
// Component
import { Tabs } from "antd";
// import { RecentCompanyTable, RecentServiceTable, RecentUserTable } from "@/components/molecules/Table";
const CompanyTableForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Company").then((module: any): any => module.CompanyTableForm), { loading: () => (<></>), ssr: false });
const ServiceTableForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Service").then((module: any): any => module.ServiceTableForm), { loading: () => (<></>), ssr: false });
const UserTableForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/User").then((module: any): any => module.UserTableForm), { loading: () => (<></>), ssr: false })
// Data type
import type { ComponentType } from "react";
// Utilities
import dayjs from "dayjs";

// 탭(Tab) 아이템
const tabItems: any[] = [
  { key: "companies", label: "회사" },
  { key: "services", label: "서비스" },
  { key: "users", label: "사용자" }
];

/** [Component] 메인 탭(Tab) */
export function MainTabs({ tabKey }: { tabKey?: string }): JSX.Element {
  // Key
  const [activeKey, setActiveKey] = useState<string | undefined>(tabKey);

  // 기준일 (Timestamp)
  const timestamp: number = dayjs(dayjs().subtract(1, "M").format("YYYY-MM-DD")).unix()
  // Tab 아이템
  const items: any = useMemo(() => tabItems.map((item: any): any => {
    switch (item.key) {
      case "companies":
        item.children = (<CompanyTableForm />);
        break;
      case "services":
        item.children = (<ServiceTableForm />);
        break;
      case "users":
        item.children = (<UserTableForm />);
        break;
    }
    // 반환
    return item;
  }), [timestamp]);

  /** [Event handler] 키(Key) 변경 */
  const onChange = useCallback((key: string): void => setActiveKey(key), []);

  /** [Event hook] 키(Key) 초기화 */
  useEffect((): void => setActiveKey(tabKey), [tabKey]);

  return (
    <Tabs activeKey={activeKey} items={items} onChange={onChange} tabBarStyle={{ marginBottom: 0, paddingLeft: 24 }} />
  );
}