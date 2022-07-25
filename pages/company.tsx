import type { NextPage } from 'next';
// Component
import { StyledPageContainer } from '@/components/styles/Layout';
import { CompanyList, Dashboard } from '@/components/Company';
import { useCallback, useState } from 'react';

const Page: NextPage = () => {
  // 선택된 회사
  const [company, setCompany] = useState<any>({ id: '', name: '' });

  /** [Event handler] 선택 초기화 */
  const onInit = useCallback(() => setCompany({ id: '', name: '' }), []);
  /** [Event handler] 회사 선택 */
  const onSelect = useCallback((record: any) => setCompany({ id: record.id, name: record.companyName }), []);

  return (
    <>
      {company.id === '' ? (
        <StyledPageContainer>
          <CompanyList onSelect={onSelect} />
        </StyledPageContainer>
      ) : (
        <Dashboard company={company} onInit={onInit} />
      )}
    </>
  )
}

export default Page;