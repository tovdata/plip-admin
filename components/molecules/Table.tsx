import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Table } from "antd";
import Link from "next/link";
import { ConsentTypeTag } from "@/components/atoms/Tag";
// Data
import { TableHeaderForCompany, TableHeaderForConsent, TableHeaderForIpp, TableHeaderForPipp } from "@/headers"
// Data type
import type { TableHeader } from "@/types";
// Query
import { getCompanies } from "@/apis/services/company";
import { getConsents, getIpps, getPipps } from "@/apis/services/documentation";
// Utilities
import { isEmptyString, transformToDate } from "@/utilities/common";

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

/** [Component] 회사 목록 테이블 */
export function CompanyTable({ keyword, onCount }: { keyword?: string, onCount: (value: number) => void }): JSX.Element {
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForCompany).map((value: any): any => {
    if (value.key === "name") {
      return { ...value, render: (value: string, record: any): JSX.Element => (
        <Link className="text-gray-800" href={`/company/${record.id}`}>{value}</Link>
      ) };
    } else if (value.key === "created_at") {
      return { ...value, render: (value: number): string => transformToDate(value) };
    } else {
      return value;
    }
  }), [TableHeaderForCompany]);

  // 회사 목록 조회
  const { data: companies, isLoading } = useQuery(["companies"], async () => await getCompanies(), { keepPreviousData: true });

  /** [Event hook] 목록 데이터 초기화 */
  useEffect((): void => {
    if (companies) {
      setDataSource(companies);
    }
    setLoading(isLoading);
  }, [isLoading, companies]);
  /** [Event hook] 검색에 따른 목록 필터링 */
  useEffect((): void => {
    if (companies) {
      if (isEmptyString(keyword)) {
        onCount(companies.length);
        setDataSource(companies);
      } else {
        const filtered: any[] = companies.filter((item: any): boolean => item.name.includes(keyword));
        onCount(filtered.length);
        setDataSource(filtered);
      }
    } else {
      onCount(0);
    }
  }, [companies, keyword, onCount]);

  return (
    <Table columns={columns} dataSource={dataSource} loading={loading} rowKey="id" />
  );
}
/** [Component] 동의서 목록 테이블 */
export function ConsentTable({ onCount, serviceId }: { onCount: (value: number) => void, serviceId: string }) {
  // 동의서 목록 조회
  const { data, isLoading } = useQuery(["consent"], async () => await getConsents(serviceId), { enabled: !isEmptyString(serviceId) });
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForConsent, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="published_at" />
  );
}
/** [Component] 내부 관리계획 목록 테이블 */
export function IppTable({ companyId, onCount }: { companyId: string, onCount: (value: number) => void }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery(["ipp"], async () => await getIpps(companyId), { enabled: !isEmptyString(companyId) });
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForIpp, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="index" />
  );
}
/** [Component] 개인정보 처리방침 목록 테이블 */
export function PippTable({ onCount, serviceId }: { onCount: (value: number) => void, serviceId: string }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery(["pipp"], async () => await getPipps(serviceId), { enabled: !isEmptyString(serviceId) });
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => setColumns(TableHeaderForPipp, true), [TableHeaderForCompany]);

  return (
    <DocumentationTable columns={columns} dataSource={data} loading={isLoading} onCount={onCount} rowKey="index" />
  );
}

/**
 * [Function] 테이블 컬럼 설정
 * @param headers 테이블 헤더 데이터
 * @param isAvaliableClick 행(Row) 클릭 가능 여부
 * @returns 가공된 컬럼 데이터 반환
 */
export function setColumns(headers: TableHeader[], isAvaliableClick?: boolean) {
  return headers.map((item: any, index: number, arr: any[]): any => {
    // 컬럼 기본 데이터
    const column: any = { className: isAvaliableClick ? "cursor-pointer" : undefined, dataIndex: item.dataIndex, key: item.key, title: item.title, width: item.width };
    // 카테고리에 따른 render 추가
    switch (item.category) {
      case "consent-tag":
        column.render = (value: string): JSX.Element => (<ConsentTypeTag type={value} />);
        break;
      case "date":
        column.render = (value: number | undefined): string => transformToDate(value);
        break;
      case "version":
        column.render = (value: number): string => value === 0 ? "외부" : value.toString();
        break;
    }
    // 첫 번째와 마지막 컬럼 패딩(Padding) 값 설정
    if (index === 0) {
      if (column.className) column.className = `${column.className} pl-6`;
      else column.className = "pl-6";
    } else if (index === arr.length - 1) {
      if (column.className) column.className = `${column.className} pr-6`;
      else column.className = "pr-6";
    }
    // 가공된 칼럼 반환
    return column;
  });
}