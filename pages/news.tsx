import type { NextPage } from 'next';
// Component
import { StyledPageContainer } from '@/components/styles/Layout';
import { NewsManagement } from '@/components/News';

const Page: NextPage = () => {
  return (
    <StyledPageContainer>
      <NewsManagement />
    </StyledPageContainer>
  )
}

export default Page;