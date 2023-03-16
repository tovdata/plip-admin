import { useMemo } from "react";
// Component
import { Breadcrumb } from "antd";
// Data type
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
// Icon
import { HomeOutlined } from "@ant-design/icons";

/** [Component] 회사 정보 페이지 헤더 */
export function CompanyInfoHeader({ companyName }: { companyName?: string }) {
  // Breadcrumb 아이템
  const bcItems: ItemType[] = useMemo(() => [
    { href: "/", title: (<HomeOutlined />) },
    { title: companyName }
  ], [companyName]);
  
  return (
    <div className="mb-4">
      <Breadcrumb items={bcItems} />
    </div>
  );
}
/** [Component] 서비스 정보 페이지 헤더 */
export function ServiceInfoHeader({ companyId, companyName, serviceName }: { companyId?: string, companyName?: string, serviceName?: string }) {
  // Breadcrumb 아이템
  const bcItems: ItemType[] = useMemo(() => [
    { href: "/", title: (<HomeOutlined />) },
    { href: companyId ? `/company/info/${companyId}` : "", title: companyName },
    { title: serviceName }
  ], [companyId, companyName, serviceName]);
  
  return (
    <div className="mb-4">
      <Breadcrumb items={bcItems} />
    </div>
  );
}