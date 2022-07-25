import type { NextPage } from 'next';
// Component
import { StyledPageContainer } from '@/components/styles/Layout';
import { CompanyList } from '@/components/Company';

const Page: NextPage = () => {
  return (
    <StyledPageContainer>
      <CompanyList />
    </StyledPageContainer>
  )
}

export default Page;