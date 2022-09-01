import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
const Home: ComponentType<any> = dynamic(() => import('@/components/pages/Home'), { loading: () => (<></>), ssr: false });
// Type
import type { ComponentType } from 'react';

const App: NextPage = () => {
  return (
    <Session>
      {/* <StyledPageContainer> */}
        <Home />
      {/* </StyledPageContainer> */}
    </Session>
  )
}

export default App;
