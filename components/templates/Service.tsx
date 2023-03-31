import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Component
import { Container } from "@/components/atoms/Container";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox } from "@/components/molecules/Box";
import { CpiInfoForm, DpiInfoForm, LastModifiedInfoForm, PiInfoForm, PpiInfoForm, ServiceInfoForm } from "@/components/organisms/form/Service";
// Component (dynamic)
const ConsentTable: ComponentType<any> = dynamic(() => import("@/components/molecules/Table").then((module: any): any => module.ConsentTable), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
const PimPopup: ComponentType<any> = dynamic(() => import("@/components/organisms/Popup").then((module: any): any => module.PimPopup), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
const PippTable: ComponentType<any> = dynamic(() => import("@/components/molecules/Table").then((module: any): any => module.PippTable), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
const ServiceInfoHeader: ComponentType<any> = dynamic(() => import("@/components/molecules/Header").then((module: any): any => module.ServiceInfoHeader), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
const ServiceTableForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Service").then((module: any): any => module.ServiceTableForm), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
// Data type
import type { ComponentType } from "react";
import type { PIM_TYPE } from "@/types";
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

  // 동의서 수
  const [consentCount, setConsentCount] = useState<number>(0);
  // 처리방침 수
  const [pippCount, setPippCount] = useState<number>(0);

  // 서비스 조회
  const { data: service } = useQuery([serviceId, "service", "info"], () => getService(serviceId), { enabled: !isEmptyString(serviceId) });
  // 회사 ID
  const companyId: string = useMemo(() => service ? service.company_id : "", [service]);
  // 회사 이름 조회
  const { data: companyName } = useQuery([companyId, "company", "name"], () => getCompanyName(companyId), { enabled: !isEmptyString(companyId) });

  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback((): void => setOpen(false), []);
  /** [Event handler] 동의서 수 변경 */
  const onConsentCount = useCallback((value: number): void => setConsentCount(value), []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback((value: PIM_TYPE): void => { setOpen(true), setPimType(value) }, []);
  /** [Event handler] 처리방침 수 변경 */
  const onPippCount = useCallback((value: number): void => setPippCount(value), []);

  // 동의서 수 Element
  const ccElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${consentCount} 개`}</DescriptionParagraph>), [consentCount]);
  // 처리방침 수 Element
  const pcElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${pippCount} 개`}</DescriptionParagraph>), [pippCount]);

  return (
    <Container>
      <ServiceInfoHeader companyId={companyId} companyName={companyName} serviceName={service?.name} />
      <div className="gap-4 grid grid-cols-12">
        <div className="col-span-12">
          <FormBox title="서비스 기본 정보">
            <ServiceInfoForm service={service} />
          </FormBox>
        </div>
        <div className="col-span-5">
          <FormBox className="flex flex-col h-full" title="최근 정보 수정일">
            <LastModifiedInfoForm serviceId={serviceId} />
          </FormBox>
        </div>
        <div className="col-span-7">
          <div className="gap-4 grid grid-cols-12 h-full">
            <div className="col-span-6">
              <PiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </div>
            <div className="col-span-6">
              <PpiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </div>
            <div className="col-span-6">
              <CpiInfoForm onOpen={onOpen} serviceId={serviceId} />
            </div>
            <div className="col-span-6">
              <DpiInfoForm serviceId={serviceId} />
            </div>
          </div>
        </div>
        <div className="col-span-7">
          <FormBox extra={ccElement} title="동의서">
          <ConsentTable onCount={onConsentCount} serviceId={serviceId} />
          </FormBox>
        </div>
        <div className="col-span-5">
          <FormBox extra={pcElement} title="개인정보 처리방침">
            <PippTable onCount={onPippCount} serviceId={serviceId} />
          </FormBox>
        </div>
      </div>
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