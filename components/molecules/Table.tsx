import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
// Component
import { Table } from "antd";
// Data
import { TableHeaderForCompany } from "@/models/header"
// Query
import { getCompanies } from "@/apis/services/company";
// Utilities
import { isEmptyValue } from "@/utilities/common";
import Link from "next/link";

/** [Component] 회사 목록 테이블 */
export function CompanyTable({ keyword, onCount }: { keyword?: string, onCount: (value: number) => void }): JSX.Element {
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 컬럼 데이터 가공
  const columns: any[] = useMemo(() => TableHeaderForCompany.map((value: any, index: number): any => {
    if (index === 0) {
      return { ...value, render: (value: string, record: any): JSX.Element => (
        <Link className="text-gray-800" href={`/company/${record.id}`}>{value}</Link>
      ) };
    } else {
      return value;
    }
  }), [TableHeaderForCompany]);

  // 회사 목록 조회
  const { data: companies, isLoading } = useQuery(["companies"], async () => await getCompanies(true), { keepPreviousData: true });

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