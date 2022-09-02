import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
// Component
// const CompanyList: ComponentType<any> = dynamic(() => import('@/components/Company').then((mod: any): any => mod.CompanyList), { loading: () => (<></>), ssr: false });
// const Dashboard: ComponentType<any> = dynamic(() => import('@/components/Company').then((mod: any): any => mod.Dashboard), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Component (style)
// const StyledPageContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledPageContainer), { loading: () => (<></>) });
// Type
import type { ComponentType } from 'react';
import Company from '@/components/pages/Company';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
  const router = useRouter();
  // Get a path parameter
  const { id } = router.query;
  // Component
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // Render
  useEffect(() => typeof id === 'string' ? setComponent(<Company companyId={id} />) : undefined, [id]);

  return (
    <Session>
      {/* {company.id === '' ? (
        <StyledPageContainer>
          <CompanyList onSelect={onSelect} />
        </StyledPageContainer>
      ) : (
        <Dashboard company={company} onInit={onInit} />
      )} */}
      {component}
    </Session>
  )
}

export default Page;