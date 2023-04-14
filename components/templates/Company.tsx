import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Component
import { Container } from "@/components/atoms/Container";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox } from "@/components/molecules/Box";
import { CompanyInfoForm } from "@/components/organisms/form/Company";
// Component (dynamic)
const CompanyInfoHeader: ComponentType<any> = dynamic(() => import("@/components/molecules/Header").then((module: any): any => module.CompanyInfoHeader), { loading: () => (<div className="h-5.5 mb-4"></div>), ssr: false });
const CompanyTableForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Company").then((module: any): any => module.CompanyTableForm), { loading: () => (<></>), ssr: false });
const IppTable: ComponentType<any> = dynamic(() => import("@/components/molecules/Table").then((module: any): any => module.IppTable), { loading: () => (<></>), ssr: false });
const ServiceListForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/Service").then((module: any): any => module.ServiceListForm), { loading: () => (<></>), ssr: false });
const UserInfoPopup: ComponentType<any> = dynamic(() => import("@/components/organisms/Popup").then((module: any): any => module.UserInfoPopup), { loading: () => (<></>), ssr: false });
const UserListForm: ComponentType<any> = dynamic(() => import("@/components/organisms/form/User").then((module: any): any => module.UserListForm), { loading: () => (<></>), ssr: false });
// Data type
import type { ComponentType } from "react";
// Query
import { getCompany } from "@/models/apis/services/company";
// Utilities
import { isEmptyString } from "@/utilities/common";

/** [Component] 회사 정보 페이지 템플릿 */
export function CompanyInfoTemplate({ companyId }: { companyId: string }): JSX.Element {
  // 팝업 표시 상태
  const [open, setOpen] = useState<boolean>(false);
  // 선택된 사용자
  const [user, setUser] = useState<any>(undefined);

  // 내부 관리계획 수
  const [ippCount, setIppCount] = useState<number>(0);
  // 서비스 수
  const [serviceCount, setServiceCount] = useState<number>(0);
  // 사용자 수
  const [userCount, setUserCount] = useState<number>(0);

  // 회사 조회
  const { data: company } = useQuery([companyId, "company", "info"], () => getCompany(companyId), { enabled: !isEmptyString(companyId) });

  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback((): void => { setOpen(false); setUser(undefined) }, []);
  /** [Event handler] 내부 관리계획 수 변경 */
  const onIppCount = useCallback((value: number): void => setIppCount(value), []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback((value: any): void => { setOpen(true); setUser(value) }, []);
  /** [Event handler] 서비스 수 변경 */
  const onServiceCount = useCallback((value: number): void => setServiceCount(value), []);
  /** [Event handler] 사용자 수 변경 */
  const onUserCount = useCallback((value: number): void => setUserCount(value), []);

  // 내부 관리계획 수 Element
  const icElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${ippCount} 개`}</DescriptionParagraph>), [ippCount]);
  // 서비스 수 Element
  const scElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${serviceCount} 개`}</DescriptionParagraph>), [serviceCount]);
  // 사용자 수 Element
  const ucElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${userCount} 개`}</DescriptionParagraph>), [userCount]);

  return (
    <Container>
      <CompanyInfoHeader companyName={company?.name} />
      <div className="gap-4 grid grid-cols-2">
        <div className="col-span-2">
          <FormBox title="회사 기본 정보">
            <CompanyInfoForm company={company} />
          </FormBox>
        </div>
        <div className="col-span-2">
          <div className="gap-4 grid grid-cols-12 h-full">
            <div className="col-span-12 flex h-full md:col-span-5">
              <FormBox className="flex-auto" extra={scElement} title="서비스">
                <ServiceListForm companyId={companyId} onCount={onServiceCount} />
              </FormBox>
            </div>
            <div className="col-span-12 flex h-full md:col-span-7">
              <FormBox className="h-full" extra={ucElement} title="사용자">
                <UserListForm companyId={companyId} onCount={onUserCount} onOpen={onOpen} />
              </FormBox>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <FormBox extra={icElement} title="내부 관리계획">
            <IppTable companyId={companyId} onCount={onIppCount} />
          </FormBox>
        </div>
      </div>
      <UserInfoPopup onCancel={onClose} open={open} user={user} />
    </Container>
  );
}
/** [Component] 회사 전체 목록 페이지 템플릿 */
export function CompanyListTemplate({ ...props }): JSX.Element {
  return (
    <Container>
      <FormBox title="전체 회사 목록">
        <CompanyTableForm {...props} />
      </FormBox>
    </Container>
  );
}