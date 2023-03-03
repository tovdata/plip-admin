import { useCallback, useState } from "react";
// Component
import { ServiceList } from "@/components/molecules/List";

/** [Component] 회사 페이지 템플릿 */
export function CompanyTemplate({ companyId }: { companyId: string }): JSX.Element {
  return (
    <div>
      <ServiceList companyId={companyId} />
    </div>
  );
}