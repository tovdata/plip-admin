import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Button, Col, Row } from "antd";
import { FormBox } from "@/components/molecules/Box";
import { CpiInfoForm, DpiInfoForm, LastModifiedInfoForm, PiInfoForm, PpiInfoForm, ServiceInfoForm } from "@/components/organisms/form/Service";
// Data type
import type { PIM_TYPE } from "@/models/types";
// Query
import { getService } from "@/apis/services/service";
// Icon
import { LeftOutlined } from "@ant-design/icons";
// Utilities
import { isEmptyString } from "@/utilities/common";
import { ConsentDocumentationForm, PippDocumentationForm } from "../organisms/form/Documentation";
import { PimPopup } from "../organisms/Popup";

/** [Component] 서비스 페이지 템플릿 */
export function ServiceTemplate({ serviceId }: { serviceId: string }): JSX.Element {
  // 라우터
  const router = useRouter();
  // 팝업 표시 상태
  const [open, setOpen] = useState<boolean>(false);
  // 개인정보 관리(PIM) 데이터 유형
  const [pimType, setPimType] = useState<PIM_TYPE | undefined>(undefined);

  // 회사 조회
  const { data: service, isLoading } = useQuery(["service-info"], async () => await getService(serviceId), { enabled: !isEmptyString(serviceId) });

  /** [Event handler] 뒤로 가기 */
  const onBack = useCallback((): void => router.back(), [router]);
  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback((): void => setOpen(false), []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback((value: PIM_TYPE): void => { setOpen(true), setPimType(value) }, []);

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
        <Col span={10}>
          <FormBox className="flex flex-col h-full" title="최근 정보 수정일">
            <LastModifiedInfoForm serviceId={serviceId} />
          </FormBox>
        </Col>
        <Col span={14}>
          <Row className="h-full" gutter={[16, 16]}>
            <Col span={12}>
              <PiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </Col>
            <Col span={12}>
              <PpiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </Col>
            <Col span={12}>
              <CpiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </Col>
            <Col span={12}>
              <DpiInfoForm serviceId={serviceId} />
            </Col>
          </Row>
        </Col>
        <Col span={14}>
          <ConsentDocumentationForm serviceId={serviceId} />
        </Col>
        <Col span={10}>
          <PippDocumentationForm serviceId={serviceId} />
        </Col>
      </Row>
      <PimPopup onCancel={onClose} open={open} serviceId={serviceId} type={pimType} />
    </div>
  );
}