import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Signin: ComponentType<any> = dynamic(() => import('@/components/Signin'), { loading: () => (<></>), ssr: false });
// Type
import type { ComponentType } from 'react';

const Page: NextPage = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <Signin />
    </div>
  )
}

export default Page;