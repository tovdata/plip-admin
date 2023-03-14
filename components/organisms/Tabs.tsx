import { useMemo } from "react";
// Component
import { Tabs } from "antd";
import { RecentCompanyTable, RecentServiceTable, RecentUserTable } from "@/components/molecules/Table";
// Utilities
import dayjs from "dayjs";

// 탭(Tab) 아이템
const tabItems: any[] = [
  { key: "companies", label: "회사" },
  { key: "services", label: "서비스" },
  { key: "users", label: "사용자" }
];

/** [Component] 메인 탭(Tab) */
export function MainTabs(): JSX.Element {
  // 기준일 (Timestamp)
  const timestamp: number = dayjs(dayjs().subtract(1, "M").format("YYYY-MM-DD")).unix()
  // Tab 아이템
  const items: any = useMemo(() => tabItems.map((item: any): any => {
    switch (item.key) {
      case "companies":
        item.children = (<RecentCompanyTable timestamp={timestamp} />);
        break;
      case "services":
        item.children = (<RecentServiceTable timestamp={timestamp} />);
        break;
      case "users":
        item.children = (<RecentUserTable timestamp={timestamp} />);
        break;
    }
    // 반환
    return item;
  }), [timestamp]);

  return (
    <Tabs items={items} tabBarStyle={{ marginBottom: 0, paddingLeft: 24 }} />
  );
}