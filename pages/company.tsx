import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { useCallback, useState } from 'react';
// Component
const CompanyList: ComponentType<any> = dynamic(() => import('@/components/Company').then((mod: any): any => mod.CompanyList), { loading: () => (<></>), ssr: false });
const Dashboard: ComponentType<any> = dynamic(() => import('@/components/Company').then((mod: any): any => mod.Dashboard), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Component (style)
const StyledPageContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledPageContainer), { loading: () => (<></>) });

const Page: NextPage = () => {
  // 선택된 회사
  const [company, setCompany] = useState<any>({ id: '', name: '' });

  /** [Event handler] 선택 초기화 */
  const onInit = useCallback(() => setCompany({ id: '', name: '' }), []);
  /** [Event handler] 회사 선택 */
  const onSelect = useCallback((record: any) => setCompany({ id: record.id, name: record.companyName }), []);

  return (
    <Session>
      {company.id === '' ? (
        <StyledPageContainer>
          <CompanyList onSelect={onSelect} />
        </StyledPageContainer>
      ) : (
        <Dashboard company={company} onInit={onInit} />
      )}
    </Session>
  )
}

export default Page;