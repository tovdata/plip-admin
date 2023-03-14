import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Input } from "antd";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox, PimStatisticsBox } from "@/components/molecules/Box";
import { DescriptionGroup, LastModifiedInfoGroup } from "@/components/molecules/Group";
import { ServiceList } from "@/components/molecules/List";
import { ServiceTable } from "@/components/molecules/Table";
// Data type
import { PIM_CPI, PIM_DPI, PIM_PI, PIM_PPI, PIM_TYPE } from "@/types";
// Query
import { getLastModified, getPiItems, getPimItems } from "@/apis/services/service";
// Utilities
import { isEmptyString, transformToDate } from "@/utilities/common";

/** [Component] 위탁 조회 폼(Form) */
export function CpiInfoForm({ onOpen, serviceId }: { onOpen: (value: PIM_TYPE) => void, serviceId: string }): JSX.Element {
  // 위탁 수 조회
  const { data } = useQuery([serviceId, "pim", PIM_CPI, "input"], async () => await getPimItems(serviceId, PIM_CPI), { enabled: !isEmptyString(serviceId) });
  // 링크 위탁 수 조회
  const { data: link } = useQuery([serviceId, "pim", PIM_CPI, "link"], async () => await getPimItems(serviceId, PIM_CPI, true), { enabled: !isEmptyString(serviceId) });

  /** [Event handler] 클릭 */
  const onClick = useCallback((): void => onOpen(PIM_CPI), [onOpen]);

  return (
    <PimStatisticsBox containLink count={data?.length} link={link?.length} onClick={onClick} title="위탁 건 수" />
  );
}
/** [Component] 파기 조회 폼(Form) */
export function DpiInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 제공 수 조회
  const { data } = useQuery([serviceId, "pim", PIM_DPI], async () => await getPimItems(serviceId, PIM_DPI), { enabled: !isEmptyString(serviceId) });

  return (
    <PimStatisticsBox count={data?.length} title="파기 건 수" />
  );
}
/** [Component] 최근 정보 수정일 폼(Form) */
export function LastModifiedInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 최근 수정일 조회
  const { data } = useQuery([serviceId, "last-modified"], async () => await getLastModified(serviceId), { enabled: !isEmptyString(serviceId) });

  return (
    <div className="pb-4 px-6">
      <LastModifiedInfoGroup datetime={data?.pi_fni?.modified_at} label="수집 및 이용" user={data?.pi_fni?.user} />
      <LastModifiedInfoGroup datetime={data?.ppi_cpi_pfni_cfni?.modified_at} label="제공 및 위탁" user={data?.ppi_cpi_pfni_cfni?.user} />
      <LastModifiedInfoGroup datetime={data?.consent?.modified_at} label="동의서" user={data?.consent?.user} />
      <LastModifiedInfoGroup datetime={data?.pipp?.modified_at} label="개인정보 처리방침" user={data?.pipp?.user} />
    </div>
  );
}
/** [Component] 수집 및 이용 항목 조회 폼(Form) */
export function PiInfoForm({ onOpen, serviceId }: { onOpen: (value: PIM_TYPE) => void, serviceId: string }): JSX.Element {
  // 수집 및 이용 항목 조회
  const { data } = useQuery([serviceId, "pim", PIM_PI, "items"], async () => await getPiItems(serviceId), { enabled: !isEmptyString(serviceId) });
  // 전체 항목 수
  const allItems: number = useMemo(() => data ? ((data.essentials.length) + (data.selections.filter((item: string): boolean => !data.essentials.includes(item))).length) : 0, [data]);

  /** [Event handler] 클릭 */
  const onClick = useCallback((): void => onOpen(PIM_PI), [onOpen]);

  // 제목
  const title: React.ReactNode = useMemo(() => (
    <>
      <>개인정보 수집 항목</>
      <small className="font-light text-gray-500 text-xs"> (필수 / 선택)</small>
    </>
  ), []);
  // 항목 구분
  const extra: React.ReactNode = useMemo(() => data ? (<>({data.essentials.length} / {data.selections.length})</>) : (<></>), [data]);

  return (
    <PimStatisticsBox count={allItems} extra={extra} onClick={onClick} title={title} />
  );
}
/** [Component] 제3자 제공 조회 폼(Form) */
export function PpiInfoForm({ onOpen, serviceId }: { onOpen: (value: PIM_TYPE) => void, serviceId: string }): JSX.Element {
  // 제공 수 조회
  const { data } = useQuery([serviceId, "pim", PIM_PPI, "input"], async () => await getPimItems(serviceId, PIM_PPI), { enabled: !isEmptyString(serviceId) });
  // 링크 제공 수 조회
  const { data: link } = useQuery([serviceId, "pim", PIM_PPI, "link"], async () => await getPimItems(serviceId, PIM_PPI, true), { enabled: !isEmptyString(serviceId) });

  /** [Event handler] 클릭 */
  const onClick = useCallback((): void => onOpen(PIM_PPI), [onOpen]);

  return (
    <PimStatisticsBox containLink count={data?.length} link={link?.length} onClick={onClick} title="제공 건 수" />
  );
}
/** [Component] 서비스 정보 폼(Form) */
export function ServiceInfoForm({ service }: { service: any }): JSX.Element {
  return (
    <div className="grid grid-cols-6 pb-5 px-6">
      <DescriptionGroup className="col-span-2 lg:col-span-1" label="이름">{service?.name}</DescriptionGroup>
      <DescriptionGroup className="col-span-2 sm:col-span-1" label="생성일">{transformToDate(service?.create_at)}</DescriptionGroup>
      <DescriptionGroup className="col-span-2 sm:col-span-3 md:col-span-1" displayEmpty label="URL">{service?.url}</DescriptionGroup>
    </div>
  );
}
/** [Component] 서비스 목록 폼(Form) */
export function ServiceListForm({ className, companyId }: { className?: string, companyId: string }): JSX.Element {
  // 서비스 수
  const [count, setCount] = useState<number>(0);

  /** [Event handler] 서비스 수 설정 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  
  // 서비스 수 Element
  const sElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${count} 개`}</DescriptionParagraph>), [count]);

  return (
    <FormBox className={className} extra={sElement} title="서비스">
      <ServiceList companyId={companyId} onCount={onCount} />
    </FormBox>
  );
}
/** [Component] 서비스 전체 목록 테이블 폼(Form) */
export function ServiceTableForm(): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");
  // 검색된 데이터 수
  const [count, setCount] = useState<number>(0);
  
  /** [Event handler] 검색된 데이터 수 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div>
      <div className="mb-4 px-6">
        <Input.Search addonBefore="서비스명" onSearch={onSearch} />
        <p className="mb-0 text-sm">{`검색 결과 : ${count}개`}</p>
      </div>
      <ServiceTable keyword={keyword} onCount={onCount} />
    </div>
  );
}