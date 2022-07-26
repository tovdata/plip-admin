import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
// Component
const MainMenu: ComponentType<any> = dynamic(() => import('@/components/Main'), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Component (style)
const StyledPageContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledPageContainer), { loading: () => (<></>) });

const Home: NextPage = () => {
  return (
    <Session>
      <StyledPageContainer>
        <MainMenu />
      </StyledPageContainer>
    </Session>
  )
}

export default Home;
