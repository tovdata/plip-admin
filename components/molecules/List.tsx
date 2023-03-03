import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
// Component
import { List } from "antd";
import { CompanyListItem, ServiceListItem } from "@/components/molecules/Item";
// Query
import { getCompanies } from "@/apis/services/company";
// Utilities
import { isEmptyValue } from "@/utilities/common";
import { getServices } from "@/models/apis/services/service";

/** [Component] 회사 목록 */
export function CompanyList({ keyword, onCount }: { keyword?: string, onCount: (value: number) => void }): JSX.Element {
  // // 목록 원본 데이터
  // const [origin, setOrigin] = useState<any[]>([]);
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);
  // 로딩 상태
  const [loading, setLoading] = useState<boolean>(true);

  // 회사 목록 조회
  const { data: companies, isLoading } = useQuery(["companies"], async () => await getCompanies(true), { keepPreviousData: true });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (<CompanyListItem id={elem.id} name={elem.name} />), []);

  /** [Event hook] 목록 원본 데이터 초기화 */
  // useEffect((): void => (!isLoading && companies) ? setOrigin(companies) : undefined, [isLoading, companies]);
  /** [Event hook] 목록 데이터 초기화 */
  useEffect((): void => { companies ? setDataSource(companies) : undefined; setLoading(isLoading) }, [isLoading, companies]);
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
    <List dataSource={dataSource} loading={loading} renderItem={renderItem} />
  );
}
/** [Component] 서비스 목록 */
export function ServiceList({ companyId }: { companyId: string }): JSX.Element {
  // 서비스 목록 조회
  const { data: services, isLoading } = useQuery(["services"], async () => await getServices(companyId), { enabled: !isEmptyValue(companyId) });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (<ServiceListItem id={elem.id} name={elem.name} />), []);

  return (
    <List dataSource={services} loading={isLoading} renderItem={renderItem} />
  );
}