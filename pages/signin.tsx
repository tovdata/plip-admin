import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Signin: ComponentType<any> = dynamic(() => import('@/components/Signin'), { loading: () => (<></>), ssr: false });
// Component (style)
const StyledSigninContainer: ComponentType<any> = dynamic(() => import('@/components/styles/Layout').then((mod: any): any => mod.StyledSigninContainer), { loading: () => (<></>) });
// Type
import type { ComponentType } from 'react';

const Page: NextPage = () => {
  return (
    <StyledSigninContainer>
      <Signin />
    </StyledSigninContainer>
  )
}

export default Page;