import { useQuery } from "react-query";
// Component
import { StatisticsBox } from "@/components/molecules/Box";
// Query
import { getCompanyCount } from "@/models/apis/services/company";

/** [Component] 전체 회사 수 */
export function CompanyCountCard(): JSX.Element {
  // 회사 수 조회
  const { data: count } = useQuery(["company", "count"], getCompanyCount);

  return (
    <StatisticsBox count={count} title="전체 회사 수" />
  );
}
/** [Component] 전체 문서 수 */
export function DocumentationCountCard(): JSX.Element {
  return (
    <StatisticsBox count={0} title="전체 문서 수" />
  );
}
/** [Component] 전체 서비스 수 */
export function ServiceCountCard(): JSX.Element {
  return (
    <StatisticsBox count={0} title="전체 서비스 수" />
  );
}
/** [Component] 전체 사용자 수 */
export function UserCountCard(): JSX.Element {
  return (
    <StatisticsBox count={0} title="전체 사용자 수" />
  );
}