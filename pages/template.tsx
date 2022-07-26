import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
// Component
const TemplateManagement: ComponentType<any> = dynamic(() => import('@/components/Template'), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Component (style)
const StyledPageContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledPageContainer), { loading: () => (<></>) });

const Page: NextPage = () => {
  return (
    <Session>
      <StyledPageContainer>
        <TemplateManagement />
      </StyledPageContainer>
    </Session>
  )
}

export default Page;