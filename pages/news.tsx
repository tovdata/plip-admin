import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
const News: ComponentType<any> = dynamic(() => import('@/components/pages/News'), { loading: () => (<></>), ssr: false });
// Type
import type { ComponentType } from 'react';


const Page: NextPage = () => {
  return (
    <Session>
      <News />
    </Session>
  )
}

export default Page;