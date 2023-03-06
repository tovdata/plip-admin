import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
// Component
import { ServiceListItem, UserListItem } from "@/components/molecules/Item";
import { List } from "antd";
// Query
import { getServices } from "@/models/apis/services/service";
import { getUsers } from "@/models/apis/services/user";
// Utilities
import { isEmptyValue } from "@/utilities/common";

/** [Component] 서비스 목록 */
export function ServiceList({ companyId, keyword, onInit }: { companyId: string, keyword: string, onInit: (value: number) => void }): JSX.Element {
  // 원본 목록 데이터
  const [origin, setOrigin] = useState<any[]>([]);
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);

  // 서비스 목록 조회
  const { data: services, isLoading } = useQuery(["services"], async () => await getServices(companyId), { enabled: !isEmptyValue(companyId) });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (
    <ServiceListItem service={elem} />
  ), []);

  /** [Event hook] 원본 목록 데이터 초기화 */
  useEffect((): void => {
    if (services) {
      onInit(services.length);
      setOrigin(services);
    }
  }, [services]);
  /** [Event hook] 목록 데이터 초기화 */
  useEffect((): void => setDataSource(origin), [origin]);
  /** [Event hook] 검색에 따른 목록 필터링 */
  useEffect((): void => isEmptyValue(keyword) ? setDataSource(origin) : setDataSource(origin.filter((item: any): boolean => item.name.includes(keyword))), [keyword, origin]);

  return (
    <List dataSource={dataSource} loading={isLoading} renderItem={renderItem} />
  );
}
/** [Component] 사용자 목록 */
export function UserList({ companyId, keyword, onInit }: { companyId: string, keyword: string, onInit: (value: number) => void }): JSX.Element {
  // 원본 목록 데이터
  const [origin, setOrigin] = useState<any[]>([]);
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);

  // 사용자 목록 조회
  const { data: users, isLoading } = useQuery(["users"], async () => await getUsers(companyId), { enabled: !isEmptyValue(companyId) });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (
    <UserListItem user={elem} />
  ), []);

  /** [Event hook] 원본 목록 데이터 초기화 */
  useEffect((): void => {
    if (users) {
      onInit(users.length);
      setOrigin(users);
    }
  }, [users]);
  /** [Event hook] 목록 데이터 초기화 */
  useEffect((): void => setDataSource(origin), [origin]);
  /** [Event hook] 검색에 따른 목록 필터링 */
  useEffect((): void => isEmptyValue(keyword) ? setDataSource(origin) : setDataSource(origin.filter((item: any): boolean => item.name.includes(keyword))), [keyword, origin]);

  return (
    <List dataSource={dataSource} loading={isLoading} renderItem={renderItem} />
  );
}