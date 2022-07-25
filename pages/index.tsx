import type { NextPage } from 'next';
// Component
import { StyledPageContainer } from '@/components/styles/Layout';
import MainMenu from '@/components/Main';

const Home: NextPage = () => {
  return (
    <StyledPageContainer>
      <MainMenu />
    </StyledPageContainer>
  )
}

export default Home;
