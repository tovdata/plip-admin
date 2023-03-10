import { useMemo } from "react";
// Component
import { CompanyCountCard, DocumentationCountCard, ServiceCountCard, UserCountCard } from "@/components/organisms/Card";
import { CompanyListForm } from "@/components/organisms/form/Company";
import { ServiceTableForm } from "@/components/organisms/form/Service";
import { UserTableForm } from "@/components/organisms/form/User";
import { Col, Input, Row, Select, Tabs } from "antd";
// Data type
const tabItems: any[] = [
  { key: "companies", label: "회사 목록" },
  { key: "services", label: "서비스 목록" },
  { key: "users", label: "사용자 목록" }
];

/** [Component] 대시보드 템플릿 */
export function DashboardTemplate(): JSX.Element {
  // // Tab 아이템
  // const items: any = useMemo(() => tabItems.map((item: any): any => {
  //   switch (item.key) {
  //     case "companies":
  //       item.children = (<CompanyListForm />);
  //       break;
  //     case "services":
  //       item.children = (<ServiceTableForm />);
  //       break;
  //     case "users":
  //       item.children = (<UserTableForm />);
  //       break;
  //   }
  //   // 반환
  //   return item;
  // }), []);

  const options: any[] = useMemo(() => [
    { label: "회사", value: "company" },
    { label: "서비스", value: "service" },
    { label: "사용자", value: "user" }
  ], []);

  return (
    <div className="m-auto max-w-7xl w-full">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <CompanyCountCard />
        </Col>
        <Col span={6}>
          <ServiceCountCard />
        </Col>
        <Col span={6}>
          <UserCountCard />
        </Col>
        <Col span={6}>
          <DocumentationCountCard />
        </Col>
        <Col span={24}>
          <div>
            <h3>검색</h3>
            <div>
              <Input.Group compact>
                <Select className="w-24" defaultValue="company" options={options} />
                <Input.Search style={{ width: "calc(100% - 96px)" }} />
              </Input.Group>
            </div>
          </div>
        </Col>
        {/* <Col span={24}>
          <Tabs items={items} tabBarStyle={{ marginBottom: 0 }} type="card" />
        </Col> */}
      </Row>
    </div>
  );
}