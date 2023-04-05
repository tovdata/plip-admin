import { useQuery } from "@tanstack/react-query";
// Component
import { StatisticsBox } from "@/components/molecules/Box";
// Query
import { getCompanyCount } from "@/models/apis/services/company";
import { getServiceCount } from "@/models/apis/services/service";
import { getUserCount } from "@/models/apis/services/user";
import { useEffect } from "react";

/** [Component] 전체 회사 수 */
export function CompanyCountCard({ onDenied }: { onDenied?: () => void }): JSX.Element {
  // 회사 수 조회
  const { data: count, isLoading, isError, error } = useQuery(["company", "count"], getCompanyCount);

  useEffect(() => {
    if (!isLoading && isError) {
      if ((error as Error).name === "UNAUTHORIZED") onDenied?.();
    }
  }, [error, isError, isLoading]);

  return (
    <StatisticsBox count={count} href="/company/list" loading={isLoading} title="전체 회사 수" />
  );
}
/** [Component] 전체 서비스 수 */
export function ServiceCountCard({ onDenied }: { onDenied?: () => void }): JSX.Element {
  // 회사 수 조회
  const { data: count, isLoading, isError, error } = useQuery(["service", "count"], getServiceCount);

  useEffect(() => {
    if (!isLoading && isError) {
      if ((error as Error).name === "UNAUTHORIZED") onDenied?.();
    }
  }, [error, isError, isLoading]);

  return (
    <StatisticsBox count={count} href="/service/list" loading={isLoading} title="전체 서비스 수" />
  );
}
/** [Component] 전체 사용자 수 */
export function UserCountCard(): JSX.Element {
  // 회사 수 조회
  const { data: count, isLoading } = useQuery(["user", "count"], getUserCount);

  return (
    <StatisticsBox count={count} href="/user/list" loading={isLoading} title="전체 사용자 수" />
  );
}