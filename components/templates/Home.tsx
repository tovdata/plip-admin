import dynamic from "next/dynamic";
// Component
import Link from "next/link";
import { Container } from "@/components/atoms/Container";
import { Box, FormBox } from "@/components/molecules/Box";
import { CompanyCountCard, ServiceCountCard, UserCountCard } from "@/components/organisms/Card";
// Component (dynamic)
const MainTabs: ComponentType<any> = dynamic(() => import("@/components/organisms/Tabs").then((module: any): any => module.MainTabs), { loading: () => (<></>), ssr: false });
// Data type
import type { ComponentType } from 'react';
// Icon
import { RightOutlined } from "@ant-design/icons";

/** [Componet] 템플릿 */
export function Template({ tabs }: { tabs?: string }): JSX.Element {
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
        <div className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6">
          <Box className="cursor-pointer flex items-center h-full">
            <Link className="flex justify-between no-underline px-6 w-full" href="https://grafana.plip.kr/d/iC8kks-Vz/statistics?orgId=1&refresh=10m&from=now-24h&to=now" rel="noopener noreferrer" target="_blank">
              <h3 className="font-bold leading-6 m-0 text-base text-gray-900">Go to grafana</h3>
              <RightOutlined className="text-gray-900" />
            </Link>
          </Box>
        </div>
      </div>
      <FormBox description="기본적으로 최근 1달 간의 데이터를 보여주며, 검색 유형에 따른 검색을 지원합니다. 아무런 조건이 없을 경우, 생성(가입)일 기준 최대 100개를 조회합니다." title="최근 목록">
        <MainTabs tabKey={tabs} />
      </FormBox>
    </Container>
  );
}