import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
// Component
import { Table } from "antd";
import Link from "next/link";
import { ConsentTypeTag } from "@/components/atoms/Tag";
// Data
import { TableHeaderForCompany, TableHeaderForConsent, TableHeaderForIpp, TableHeaderForPipp, TableHeaderForService, TableHeaderForUser } from "@/headers";
import { TableHeaderForCpi, TableHeaderForCpiForeign, TableHeaderForLink, TableHeaderForPi, TableHeaderForPpi, TableHeaderForPpiForeign } from "@/headers";
// Data type
import { PIM_CPI, PIM_PI, PIM_PPI, PIM_TYPE, SearchOption, TableHeader } from "@/types";
// Icon
import { CheckCircleOutlined } from "@ant-design/icons";
// Query
import { findCompanies } from "@/apis/services/company";
import { getConsents, getIpps, getPipps } from "@/apis/services/documentation";
import { findServices, getPimItems } from "@/apis/services/service";
import { findUsers } from "@/apis/services/user";
// Utilities
import { isEmptyString, transformToDate, transformToDateTime } from "@/utilities/common";

/** [Internal Component] 문서 목록 테이블 */
function DocumentationTable({ columns, dataSource, loading, onCount, rowKey }: { columns: any[], dataSource?: any[], loading?: boolean, onCount?: (value: number) => void, rowKey: string }): JSX.Element {
  /** [Event handler] 행(Row) 클릭 */
  const onRow = useCallback((record: any) => ({
    onClick: (e: any): void => { e.preventDefault(); (typeof window !== "undefined") ? window.open(record.url, "_blank") : undefined }
  }), []);

  /** [Event hook] 데이터 수 확인 */
  useEffect((): void => onCount ? dataSource ? onCount(dataSource.length) : onCount(0) : undefined, [dataSource]);

  return (
    <Table columns={columns} dataSource={dataSource} loading={loading} onRow={onRow} rowKey={rowKey} size="middle" />
  );
}
/** [Internal Component] 개인정보 관리(PIM) 테이블 */
function PimTable({ columns, fColumns, serviceId, type }: { columns: any[], fColumns?: any[], serviceId: string, type: PIM_TYPE }): JSX.Element {
  // 데이터 조회
  const { data, isLoading } = useQuery([serviceId, "pim", type, "input"], async () => await getPimItems(serviceId, type), { enabled: !isEmptyString(serviceId) });
  // 국외 데이터
  const fDataSource: any[] = useMemo(() => data ? data.filter((item: any): boolean => item.isForeign) : [], [data]);

  return (
    <>
      <div>
        <h4 className="my-2">입력된 데이터</h4>
        <Table className="text-table-sm" columns={columns} dataSource={data} loading={isLoading} rowKey="index" size="middle" />
      </div>
      <>{fDataSource.length > 0 ? (
        <div>
          <h4 className="my-2">국외 데이터</h4>
          <Table columns={fColumns} dataSource={fDataSource} loading={isLoading} rowKey="index" size="middle" />
        </div>
      ) : (<></>)}</>
    </>
  );
}
/** [Internal Component] 개인정보 관리(PIM) 링크 테이블 */
function PimLinkTable({ columns, serviceId, type }: { columns: any[], serviceId: string, type: PIM_TYPE }): JSX.Element {
  // 데이터 조회
  const { data, isLoading } = useQuery([serviceId, "pim", type, "link"], async () => await getPimItems(serviceId, type, true), { enabled: !isEmptyString(serviceId) });

  return (
    <div>
      <h4 className="my-2">링크 데이터</h4>
      <Table columns={columns} dataSource={data} loading={isLoading} rowKey="index" size="middle" />
    </div>
  );
}

/** [Component] 위탁 데이터 테이블 */
export function CpiTable({ serviceId }: { serviceId: string }): JSX.Element {
  // 위탁 데이터 테이블 컬럼
  const columns: any[] = useMemo(() => setColumns(TableHeaderForCpi, false, true), []);
  // 국위 위탁 데이터 테이블 컬럼
  const fColumns: any[] = useMemo(() => setColumns(TableHeaderForCpiForeign, false, true), []);
  // 위탁 링크 데이터 테이블 컬럼
  const lColumns: any[] = useMemo(() => setColumns(TableHeaderForLink, false, true), []);

  return (
    <>
      <PimTable columns={columns} fColumns={fColumns} serviceId={serviceId} type={PIM_CPI} />
      <PimLinkTable columns={lColumns} serviceId={serviceId} type={PIM_CPI} />
    </>
  );
}
/** [Component] 회사 목록 테이블 */
export function CompanyTable({ onCount, option }: { onCount?: (value: number) => void, option?: SearchOption }): JSX.Element {
  // 회사 목록 조회
  const { data: companies, isFetched, refetch } = useQuery(["company", "list"], async () => await findCompanies(option));
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForCompany).map((value: any): any => value.key === "name" ? ({ ...value, render: (value: string, record: any): JSX.Element => (<Link className="text-gray-800" href={`/company/info/${record.id}`}>{value}</Link>) }) : value), []);

  /** [Event hook] 검색 갯수 파악 */
  useEffect((): void => companies && onCount ? onCount(companies.length) : undefined, [companies, onCount]);
  /** [Event hook] 검색에 따른 데이터 처리 */
  useEffect((): any => {
    async function fetchData() {
      refetch();
    };
    fetchData();
  }, [option]);

  return (
    <Table columns={columns} dataSource={companies} loading={!isFetched} pagination={false} rowKey="id" showSorterTooltip={false} scroll={{ y: 440 }} />
  );
}
/** [Component] 동의서 목록 테이블 */
export function ConsentTable({ onCount, serviceId }: { onCount: (value: number) => void, serviceId: string }) {
  // 동의서 목록 조회
  const { data, isLoading } = useQuery([serviceId, "consent"], async () => await getConsents(serviceId), { enabled: !isEmptyString(serviceId) });
  // 컬럼 데이터
  const columns: any[] = useMemo(() => setColumns(TableHeaderForConsent, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="published_at" />
  );
}
/** [Component] 내부 관리계획 목록 테이블 */
export function IppTable({ companyId, onCount }: { companyId: string, onCount: (value: number) => void }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery([companyId, "ipp"], async () => await getIpps(companyId), { enabled: !isEmptyString(companyId) });
  // 컬럼 데이터
  const columns: any[] = useMemo(() => setColumns(TableHeaderForIpp, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="index" />
  );
}
/** [Component] 개인정보 처리방침 목록 테이블 */
export function PippTable({ onCount, serviceId }: { onCount: (value: number) => void, serviceId: string }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery([serviceId, "pipp"], async () => await getPipps(serviceId), { enabled: !isEmptyString(serviceId) });
  // 컬럼 데이터
  const columns: any[] = useMemo(() => setColumns(TableHeaderForPipp, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="index" />
  );
}
/** [Component] 수집 및 이용 데이터 테이블 */
export function PiTable({ serviceId }: { serviceId: string }): JSX.Element {
  // 수집 및 이용 데이터 테이블 컬럼
  const columns: any[] = useMemo(() => setColumns(TableHeaderForPi, false, true), []);

  return (
    <PimTable columns={columns} serviceId={serviceId} type={PIM_PI} />
  );
}
/** [Component] 제공 데이터 테이블 */
export function PpiTable({ serviceId }: { serviceId: string }): JSX.Element {
  // 제공 데이터 테이블 컬럼
  const columns: any[] = useMemo(() => setColumns(TableHeaderForPpi, false, true), []);
  // 국위 제공 데이터 테이블 컬럼
  const fColumns: any[] = useMemo(() => setColumns(TableHeaderForPpiForeign, false, true), []);
  // 제공 링크 데이터 테이블 컬럼
  const lColumns: any[] = useMemo(() => setColumns(TableHeaderForLink, false, true), []);

  return (
    <>
      <PimTable columns={columns} fColumns={fColumns} serviceId={serviceId} type={PIM_PPI} />
      <PimLinkTable columns={lColumns} serviceId={serviceId} type={PIM_PPI} />
    </>
  );
}
/** [Component] 서비스 전체 목록 테이블 */
export function ServiceTable({ onCount, option }: { onCount?: (value: number) => void, option?: SearchOption }): JSX.Element {
  // 서비스 목록 조회
  const { data: services, isFetched, refetch } = useQuery(["service", "list"], async () => await findServices(option));
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForService).map((value: any): any => {
    if (value.key === "name") return { ...value, render: (value: string, record: any): JSX.Element => (<Link className="text-gray-800" href={`/service/info/${record.id}`}>{value}</Link>) };
    else if (value.key === "company_name") return { ...value, render: (value: string, record: any): JSX.Element => (<Link className="text-gray-800" href={`/service/info/${record.company_id}`}>{value}</Link>) };
    else return value;
  }), []);

  /** [Event hook] 검색 갯수 파악 */
  useEffect((): void => services && onCount ? onCount(services.length) : undefined, [services, onCount]);
  /** [Event hook] 검색에 따른 데이터 처리 */
  useEffect((): any => {
    async function fetchData() {
      refetch();
    };
    fetchData();
  }, [option]);

  return (
    <Table columns={columns} dataSource={services} loading={!isFetched} pagination={false} rowKey="id" showSorterTooltip={false} scroll={{ y: 440 }} />
  );
}
/** [Component] 사용자 전체 목록 테이블 */
export function UserTable({ onCount, option }: { onCount?: (value: number) => void, option?: SearchOption }): JSX.Element {
  // 사용자 목록 조회
  const { data: users, isFetched, refetch } = useQuery(["user", "list"], async () => await findUsers(option));
  // 컬럼 데이터
  const columns: any[] = useMemo(() => setColumns(TableHeaderForUser).map((value: any): any => {
    if (value.key === "company_name") {
      return { ...value, filters: [{ text: "가입", value: true }, { text: "미가입", value: false }], onFilter: (value: boolean, record: any): boolean => value ? !isEmptyString(record.company_name) : isEmptyString(record.company_name), render: (value: string, record: any): React.ReactNode => record.affiliation ? (<Link className="text-gray-800" href={`/company/info/${record.affiliation}`}>{value}</Link>) : value };
    } else if (value.key === "ssa1") {
      return { ...value, filters: [{ text: "동의", value: 1 }, { text: "비동의", value: 0 }], onFilter: (value: number, record: any): boolean => record.ssa1 === value };
    } else {
      return value;
    }
  }), []);

  /** [Event hook] 검색 갯수 파악 */
  useEffect((): void => users && onCount ? onCount(users.length) : undefined, [users, onCount]);
  /** [Event hook] 검색에 따른 데이터 처리 */
  useEffect((): any => {
    async function fetchData() {
      refetch();
    };
    fetchData();
  }, [option]);

  return (
    <Table columns={columns} dataSource={users} loading={!isFetched} pagination={false} rowKey="id" showSorterTooltip={false} scroll={{ y: 440 }} />
  );
}

/**
 * [Function] 테이블 컬럼 설정
 * @param headers 테이블 헤더 데이터
 * @param isAvaliableClick 행(Row) 클릭 가능 여부
 * @param isPim 개인정보 관리(PIM) 데이터 테이블 여부
 * @returns 가공된 컬럼 데이터 반환
 */
export function setColumns(headers: TableHeader[], isAvaliableClick?: boolean, isPim?: boolean) {
  return headers.map((item: any, index: number, arr: any[]): any => {
    // 클래스
    const className: string = isPim ? item.className ? `text-table-sm ${item.className}` : "text-table-sm" : "";
    // 컬럼 기본 데이터
    const column: any = { className: isAvaliableClick ? `${className} cursor-pointer` : !isEmptyString(className) ? className : undefined, dataIndex: item.dataIndex, key: item.key, title: item.title, width: item.width };
    // 카테고리에 따른 render 추가
    switch (item.category) {
      case "check":
        column.render = (value: boolean | number): JSX.Element => value ? (<CheckCircleOutlined />) : (<></>);
        break;
      case "consent-tag":
        column.render = (value: string): JSX.Element => (<ConsentTypeTag type={value} />);
        break;
      case "date":
        column.render = (value: number | undefined): string => transformToDate(value);
        break;
      case "datetime":
        column.render = (value: number | undefined): string => transformToDateTime(value);
        break;
      case "item-split":
        column.render = (value: string[] | undefined): string => value ? value.join(", ") : "";
        break;
      case "list":
        column.render = (value: string[] | undefined): JSX.Element => value ? (<ul className="m-0 pl-5">{value.map((item: string): JSX.Element => (<li key={item}>{item}</li>))}</ul>) : (<></>);
        break;
      case "phone":
        column.render = (value: any): string => value?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        break;
      case "version":
        column.render = (value: number): string => value === 0 ? "외부" : value.toString();
        break;
    }
    // 정렬
    if (item.sort || item.sortDirections) {
      // 정렬 옵션이 있을 경우
      if (item.sortDirections) {
        column.sortDirections = item.sortDirections;
        // 정렬 옵션에 따른 정렬 함수 추가
        if (item.sortDirections.length > 1 || item.sortDirections[0] === "ascend") {
          column.sorter = (a: any, b: any): any => a[item.key] - b[item.key];
        } else {
          column.sorter = (a: any, b: any): any => b[item.key] - a[item.key];
        }
      } else {
        // 정렬 함수 추가 (오름차순)
        column.sorter = (a: any, b: any): any => a[item.key] - b[item.key];
      }
    }
    // 첫 번째와 마지막 컬럼 패딩(Padding) 값 설정
    if (isPim) {
      if (index === 0) {
        if (column.className) column.className = `${column.className} pl-4`;
        else column.className = "pl-4";
      } else if (index === arr.length - 1) {
        if (column.className) column.className = `${column.className} pr-4`;
        else column.className = "pr-4";
      }
    } else {
      if (index === 0) {
        if (column.className) column.className = `${column.className} pl-6`;
        else column.className = "pl-6";
      } else if (index === arr.length - 1) {
        if (column.className) column.className = `${column.className} pr-6`;
        else column.className = "pr-6";
      }
    }
    // 가공된 칼럼 반환
    return column;
  });
}