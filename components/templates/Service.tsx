import { useRouter } from "next/router";
import { useCallback } from "react";
import { useQuery } from "react-query";
// Component
import { Button, Col, Row, Table } from "antd";
import { FormBox } from "@/components/molecules/Box";
import { CpiInfoForm, DpiInfoForm, LastModifiedInfoForm, PpiInfoForm, ServiceInfoForm } from "@/components/organisms/form/Service";
// Query
import { getService } from "@/models/apis/services/service";
// Icon
import { LeftOutlined } from "@ant-design/icons";
// Utilities
import { isEmptyValue } from "@/utilities/common";

/** [Component] 서비스 페이지 템플릿 */
export function ServiceTemplate({ serviceId }: { serviceId: string }): JSX.Element {
  // 라우터
  const router = useRouter();

  // 회사 조회
  const { data: service, isLoading } = useQuery(["service-info"], async () => await getService(serviceId), { enabled: !isEmptyValue(serviceId) });

  /** [Event handler] 뒤로 가기 */
  const onBack = useCallback((): void => router.back(), [router]);

  return (
    <div className="m-auto max-w-7xl w-full">
      <div className="flex items-center">
        <Button className="mr-2" icon={<LeftOutlined />} onClick={onBack} shape="circle" type="text" />
        <h2>서비스</h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FormBox title="서비스 기본 정보">
            <ServiceInfoForm service={service} />
          </FormBox>
        </Col>
        <Col span={8}>
          <FormBox className="h-full" title="최근 정보 수정일">
            <LastModifiedInfoForm serviceId={serviceId} />
          </FormBox>
        </Col>
        <Col span={8}>
          <FormBox className="h-full" title="개인정보 수집 항목"></FormBox>
        </Col>
        <Col className="flex flex-col justify-between" span={8}>
          <PpiInfoForm serviceId={serviceId} />
          <CpiInfoForm serviceId={serviceId} />
          <DpiInfoForm serviceId={serviceId} />
        </Col>
        <Col span={12}>
          <Table />
        </Col>
        <Col span={12}>
          <Table />
        </Col>
      </Row>
    </div>
  );
}