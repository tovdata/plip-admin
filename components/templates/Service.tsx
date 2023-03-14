import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Breadcrumb, Col, Row } from "antd";
import { Container } from "@/components/atoms/Container";
import { FormBox } from "@/components/molecules/Box";
import { ConsentDocumentationForm, PippDocumentationForm } from "@/components/organisms/form/Documentation";
import { CpiInfoForm, DpiInfoForm, LastModifiedInfoForm, PiInfoForm, PpiInfoForm, ServiceInfoForm, ServiceTableForm } from "@/components/organisms/form/Service";
import { PimPopup } from "@/components/organisms/Popup";
// Data type
import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import type { PIM_TYPE } from "@/models/types";
// Icon
import { HomeOutlined } from "@ant-design/icons";
// Query
import { getCompanyName } from "@/apis/services/company";
import { getService } from "@/apis/services/service";
// Utilities
import { isEmptyString } from "@/utilities/common";

/** [Component] 서비스 정보 페이지 템플릿 */
export function ServiceInfoTemplate({ serviceId }: { serviceId: string }): JSX.Element {
  // 팝업 표시 상태
  const [open, setOpen] = useState<boolean>(false);
  // 개인정보 관리(PIM) 데이터 유형
  const [pimType, setPimType] = useState<PIM_TYPE | undefined>(undefined);

  // 서비스 조회
  const { data: service } = useQuery([serviceId, "service", "info"], async () => await getService(serviceId), { enabled: !isEmptyString(serviceId) });
  // 회사 ID
  const companyId: string = useMemo(() => service ? service.company_id : "", [service]);
  // 회사 이름 조회
  const { data: companyName } = useQuery([companyId, "company", "name"], async () => await getCompanyName(companyId), { enabled: !isEmptyString(companyId) });
  // Breadcrumb 아이템
  const bcItems: ItemType[] = useMemo(() => (companyName && service) ? [
    { href: "/", title: (<HomeOutlined />) },
    { href: `/company/${service.company_id}`, title: companyName },
    { title: service.name }
  ] : [], [companyName, service]);

  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback((): void => setOpen(false), []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback((value: PIM_TYPE): void => { setOpen(true), setPimType(value) }, []);

  return (
    <Container>
      <div className="mb-4">
        <Breadcrumb items={bcItems} />
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
    </Container>
  );
}
/** [Component] 서비스 전체 목록 페이지 템플릿 */
export function ServiceListTemplate(): JSX.Element {
  return (
    <Container>
      <FormBox title="서비스 전체 목록">
        <ServiceTableForm />
      </FormBox>
    </Container>
  );
}