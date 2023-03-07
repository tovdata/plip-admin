import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Divider, Input } from "antd";
import { PimStatisticsBox } from "@/components/molecules/Box";
import { DescriptionGroup, LastModifiedInfoGroup } from "@/components/molecules/Group";
import { ServiceList } from "@/components/molecules/List";
// Data type
import { PIM_CPI, PIM_DPI, PIM_PPI } from "@/types";
// Query
import { getLastModified, getPimItems } from "@/apis/services/service";
// Utilities
import { isEmptyValue, transformToDate } from "@/utilities/common";

/** [Component] 위탁 조회 폼(Form) */
export function CpiInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 제공 수 조회
  const { data } = useQuery(["pim", PIM_CPI], async () => await getPimItems(serviceId, PIM_CPI), { enabled: !isEmptyValue(serviceId) });
  // 링크 제공 수 조회
  const { data: link } = useQuery(["pim", `${PIM_CPI}-link`], async () => await getPimItems(serviceId, PIM_CPI, true), { enabled: !isEmptyValue(serviceId) });

  return (
    <PimStatisticsBox containLink count={data?.length} link={link?.length} title="위탁 건 수" />
  );
}
/** [Component] 파기 조회 폼(Form) */
export function DpiInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 제공 수 조회
  const { data } = useQuery(["pim", PIM_DPI], async () => await getPimItems(serviceId, PIM_DPI), { enabled: !isEmptyValue(serviceId) });

  return (
    <PimStatisticsBox count={data?.length} title="파기 건 수" />
  );
}
/** [Component] 최근 정보 수정일 폼(Form) */
export function LastModifiedInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 최근 수정일 조회
  const { data } = useQuery(["last-modified"], async () => await getLastModified(serviceId), { enabled: !isEmptyValue(serviceId) });

  return (
    <div className="px-6">
      <LastModifiedInfoGroup datetime={data?.pi_fni?.modified_at} label="수집 및 이용" user={data?.pi_fni?.user} />
      <LastModifiedInfoGroup datetime={data?.pi_fni?.modified_at} label="수집 및 이용" user={data?.pi_fni?.user} />
      <LastModifiedInfoGroup datetime={data?.pi_fni?.modified_at} label="수집 및 이용" user={data?.pi_fni?.user} />
      <LastModifiedInfoGroup datetime={data?.pi_fni?.modified_at} label="수집 및 이용" user={data?.pi_fni?.user} />
    </div>
  );
}
/** [Component] 제3자 제공 조회 폼(Form) */
export function PpiInfoForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 제공 수 조회
  const { data } = useQuery(["pim", PIM_PPI], async () => await getPimItems(serviceId, PIM_PPI), { enabled: !isEmptyValue(serviceId) });
  // 링크 제공 수 조회
  const { data: link } = useQuery(["pim", `${PIM_PPI}-link`], async () => await getPimItems(serviceId, PIM_PPI, true), { enabled: !isEmptyValue(serviceId) });

  return (
    <PimStatisticsBox containLink count={data?.length} link={link?.length} title="제공 건 수" />
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
export function ServiceListForm({ companyId, onInit }: { companyId: string, onInit: (value: number) => void }): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");

  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div>
      <Input.Search className="px-6" onSearch={onSearch} />
      <Divider className="mb-0" />
      <div>
        <ServiceList companyId={companyId} keyword={keyword} onInit={onInit} />
      </div>
    </div>
  );
}