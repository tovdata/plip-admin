import dynamic from "next/dynamic";
// Component
import { Container } from "@/components/atoms/Container";
import { FormBox } from "@/components/molecules/Box";
import { CompanyCountCard, ServiceCountCard, UserCountCard } from "@/components/organisms/Card";
// Component (dynamic)
const MainTabs = dynamic(() => import("@/components/organisms/Tabs").then((module: any): any => module.MainTabs), { loading: () => (<></>), ssr: false });

/** [Componet] 템플릿 */
export function Template(): JSX.Element {
  return (
    <Container>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
          <CompanyCountCard />
        </div>
        <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
          <ServiceCountCard />
        </div>
        <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
          <UserCountCard />
        </div>
      </div>
      <FormBox description="최근 1달 간의 데이터" title="최근 목록">
        <MainTabs />
      </FormBox>
    </Container>
  );
}