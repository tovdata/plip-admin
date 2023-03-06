// Component
import { CompanyCountCard, DocumentationCountCard, ServiceCountCard, UserCountCard } from "@/components/organisms/Card";
import { CompanyListForm } from "@/components/organisms/form/Company";
import { Col, Row } from "antd";

/** [Component] 대시보드 템플릿 */
export function DashboardTemplate(): JSX.Element {
  return (
    <div>
      <Row gutter={16}>
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
      </Row>
      <div className="grid grid-cols-4 gap-4 mb-4">
        
      </div>
      <div className="bg-white overflow-hidden rounded-lg shadow">
        <div className="pt-4 px-6">
          <h3 className="font-semibold leading-6 m-0 p-0 text-lg text-gray-900">회사</h3>
        </div>
        <CompanyListForm />
      </div>
    </div>
  );
}