import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { FormBox } from "@/components/molecules/Box";
import { ServiceListForm, UserListForm } from "@/components/organisms/form/Company";
import { Button, Col, Row } from "antd";
// Query
import { getCompany } from "@/models/apis/services/company";
// Icon
import { LeftOutlined } from "@ant-design/icons";
// Utilities
import { isEmptyValue } from "@/utilities/common";
import { useRouter } from "next/router";

/** [Component] 회사 페이지 템플릿 */
export function CompanyTemplate({ companyId }: { companyId: string }): JSX.Element {
  // 라우터
  const router = useRouter();

  // 서비스 수
  const [serviceCount, setServiceCount] = useState<number>(0);
  // 소속된 사용자 수
  const [userCount, setUserCount] = useState<number>(0);

  // 회사 조회
  const { data: company, isLoading } = useQuery(["company-info"], async () => await getCompany(companyId), { enabled: !isEmptyValue(companyId) });

  /** [Event handler] 뒤로 가기 */
  const onBack = useCallback((): void => router.back(), [router]);
  /** [Event handler] 서비스 수 변경 */
  const onChangeServiceCount = useCallback((value: number): void => setServiceCount(value), []);
  /** [Event handler] 소속된 사용자 수 변경 */
  const onChangeUserCount = useCallback((value: number): void => setUserCount(value), []);

  // 서비스 수 Element
  const sElement: React.ReactNode = useMemo(() => (<p className="m-0 text-gray-500 text-xs">{`${serviceCount} 개`}</p>), [serviceCount]);
  // 소속 사용자 수 Element
  const uElement: React.ReactNode = useMemo(() => (<p className="m-0 text-gray-500 text-xs">{`${userCount} 명`}</p>), [userCount]);

  return (
    <Row className="w-full" justify="center" gutter={[24, 24]}>
      <Col lg={14} span={24}>
        <div className="flex items-center">
          <Button className="mr-2" icon={<LeftOutlined />} onClick={onBack} shape="circle" type="text" />
          <h2>{company?.name}</h2>
        </div>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <FormBox title="개인정보 보호책임자"></FormBox>
          </Col>
          <Col span={10}>
            <FormBox extra={sElement} title="서비스">
              <ServiceListForm companyId={companyId} onInit={onChangeServiceCount} />
            </FormBox>
          </Col>
          <Col span={14}>
            <FormBox extra={uElement} title="사용자">
              <UserListForm companyId={companyId} onInit={onChangeUserCount} />
            </FormBox>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}