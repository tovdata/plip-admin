import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const TemplateManagement: ComponentType<any> = dynamic(() => import('@/components/Template'), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Component (style)
const StyledPageContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledPageContainer), { loading: () => (<></>) });
// Type
import type { ComponentType } from 'react';

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