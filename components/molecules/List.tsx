import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// Component
import { List } from "antd";
import { ServiceListItem, UserListItem } from "@/components/molecules/Item";
// Query
import { getServicesByCompany } from "@/models/apis/services/service";
import { getUsersByCompany } from "@/models/apis/services/user";
// Utilities
import { isEmptyString } from "@/utilities/common";

/** [Component] 서비스 목록 */
export function ServiceList({ companyId, onCount }: { companyId: string, onCount: (value: number) => void }): JSX.Element {
  // 서비스 목록 조회
  const { data: services, isLoading } = useQuery([companyId, "service", "list"], async () => await getServicesByCompany(companyId), { enabled: !isEmptyString(companyId) });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (
    <ServiceListItem createAt={elem?.create_at} name={elem?.name} id={elem?.id} />
  ), []);

  /** [Event hook] 데이터 수 설정 */
  useEffect((): void => services ? onCount(services.length) : undefined, [services]);

  return (
    <List className="border-solid border-0 border-t border-slate-200" dataSource={services} loading={isLoading} renderItem={renderItem} />
  );
}
/** [Component] 사용자 목록 */
export function UserList({ companyId, keyword, onCount, onOpen }: { companyId: string, keyword: string, onCount: (value: number) => void, onOpen: (value: any) => void }): JSX.Element {
  // 원본 목록 데이터
  const [origin, setOrigin] = useState<any[]>([]);
  // 목록 데이터
  const [dataSource, setDataSource] = useState<any[]>([]);

  // 사용자 목록 조회
  const { data: users, isLoading } = useQuery([companyId, "user", "list"], async () => await getUsersByCompany(companyId), { enabled: !isEmptyString(companyId) });

  // 목록 컴포넌트에서 사용할 렌더러
  const renderItem = useCallback((elem: any): React.ReactNode => (
    <UserListItem onClick={onOpen} user={elem} />
  ), [onOpen]);

  /** [Event hook] 원본 목록 데이터 초기화 */
  useEffect((): void => {
    if (users) {
      onCount(users.length);
      setOrigin(users);
    }
  }, [users]);
  /** [Event hook] 목록 데이터 초기화 */
  useEffect((): void => setDataSource(origin), [origin]);
  /** [Event hook] 검색에 따른 목록 필터링 */
  useEffect((): void => isEmptyString(keyword) ? setDataSource(origin) : setDataSource(origin.filter((item: any): boolean => item.name.includes(keyword))), [keyword, origin]);

  return (
    <List className="border-solid border-0 border-t border-slate-200 overflow-auto" dataSource={dataSource} loading={isLoading} renderItem={renderItem} style={{ maxHeight: 408 }} />
  );
}