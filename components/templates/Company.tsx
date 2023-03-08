import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Button, Col, Row } from "antd";
import { CompanyInfoForm } from "@/components/organisms/form/Company";
import { IppDocumentationForm } from "@/components/organisms/form/Documentation";
import { ServiceListForm } from "@/components/organisms/form/Service";
import { UserListForm } from "@/components/organisms/form/User";
import { UserInfoPopup } from "@/components/organisms/Popup";
// Query
import { getCompany } from "@/models/apis/services/company";
// Icon
import { LeftOutlined } from "@ant-design/icons";
// Utilities
import { isEmptyString } from "@/utilities/common";

/** [Component] 회사 페이지 템플릿 */
export function CompanyTemplate({ companyId }: { companyId: string }): JSX.Element {
  // 라우터
  const router = useRouter();

  // 팝업 표시 상태
  const [open, setOpen] = useState<boolean>(false);
  // 선택된 사용자
  const [user, setUser] = useState<any>(undefined);

  // 회사 조회
  const { data: company, isLoading } = useQuery(["company-info"], async () => await getCompany(companyId), { enabled: !isEmptyString(companyId) });

  /** [Event handler] 뒤로 가기 */
  const onBack = useCallback((): void => router.back(), [router]);
  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback((): void => { setOpen(false); setUser(undefined) }, []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback((value: any): void => { setOpen(true); setUser(value) }, []);

  return (
    <div className="m-auto max-w-7xl w-full">
      <div className="flex items-center">
        <Button className="mr-2" icon={<LeftOutlined />} onClick={onBack} shape="circle" type="text" />
        <h2>{company?.name}</h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row className="h-full" gutter={[16, 16]}>
            <Col className="flex flex-col h-full" md={10} span={24}>
              <CompanyInfoForm className="mb-4" company={company} />
              <ServiceListForm className="flex-auto" companyId={companyId} />
            </Col>
            <Col className="h-full" md={14} span={24}>
              <UserListForm companyId={companyId} onOpen={onOpen} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <IppDocumentationForm companyId={companyId} />
        </Col>
      </Row>
      <UserInfoPopup onCancel={onClose} open={open} user={user} />
    </div>
  );
}