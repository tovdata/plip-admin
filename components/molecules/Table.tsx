import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Table } from "antd";
import Link from "next/link";
// Data
import { TableHeaderForCompany, TableHeaderForConsent, TableHeaderForIpp, TableHeaderForPipp } from "@/headers"
// Query
import { getCompanies } from "@/apis/services/company";
// Utilities
import { isEmptyValue, transformToDate } from "@/utilities/common";
import { getConsents, getIpps, getPipps } from "@/models/apis/services/documentation";

/** [Component] 회사 목록 테이블 */
export function CompanyTable({ keyword, onCount }: { keyword?: string, onCount: (value: number) => void }): JSX.Element {
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => TableHeaderForCompany.map((value: any): any => {
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
      if (isEmptyValue(keyword)) {
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
export function ConsentTable({ serviceId }: { serviceId: string }) {
  // 동의서 목록 조회
  const { data, isLoading } = useQuery(["consent"], async () => await getConsents(serviceId), { enabled: !isEmptyValue(serviceId) });

  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => TableHeaderForConsent.map((value: any): any => {
    if (value.key === "published_at") {
      return { ...value, render: (value: number): string => transformToDate(value) };
    } else {
      return value;
    }
  }), [TableHeaderForCompany]);

  return (
    <Table columns={columns} dataSource={data} rowKey="id" />
  );
}
/** [Component] 내부 관리계획 목록 테이블 */
export function IppTable({ serviceId }: { serviceId: string }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery(["ipp"], async () => await getIpps(serviceId), { enabled: !isEmptyValue(serviceId) });
console.log("data", data);
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => TableHeaderForIpp.map((value: any): any => {
    if (value.key === "published_at") {
      return { ...value, render: (value: number): string => transformToDate(value) };
    } else {
      return value;
    }
  }), [TableHeaderForCompany]);

  return (
    <Table columns={columns} dataSource={data} rowKey="id" />
  );
}
/** [Component] 개인정보 처리방침 목록 테이블 */
export function PippTable({ serviceId }: { serviceId: string }) {
  // 내부 관리계획 목록 조회
  const { data, isLoading } = useQuery(["pipp"], async () => await getPipps(serviceId), { enabled: !isEmptyValue(serviceId) });
console.log("data", data);
  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => TableHeaderForPipp.map((value: any): any => {
    if (value.key === "published_at") {
      return { ...value, render: (value: number): string => transformToDate(value) };
    } else {
      return value;
    }
  }), [TableHeaderForCompany]);

  return (
    <Table columns={columns} dataSource={data} rowKey="id" />
  );
}