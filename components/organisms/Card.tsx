import { useQuery } from "react-query";
// Component
import { StatisticsBox } from "@/components/molecules/Box";
// Query
import { getCompanyCount } from "@/models/apis/services/company";
import { getServiceCount } from "@/models/apis/services/service";
import { getUserCount } from "@/models/apis/services/user";

/** [Component] 전체 회사 수 */
export function CompanyCountCard(): JSX.Element {
  // 회사 수 조회
  const { data: count, isLoading } = useQuery(["company", "count"], getCompanyCount);

  return (
    <StatisticsBox count={count} href="/company/list" loading={isLoading} title="전체 회사 수" />
  );
}
/** [Component] 전체 서비스 수 */
export function ServiceCountCard(): JSX.Element {
  // 회사 수 조회
  const { data: count, isLoading } = useQuery(["service", "count"], getServiceCount);

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