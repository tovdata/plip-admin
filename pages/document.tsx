import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Document: ComponentType<any> = dynamic(() => import('@/components/pages/Document'), { loading: () => (<></>), ssr: false });
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
// Type
import type { ComponentType } from 'react';

const Page: NextPage = () => {
  return (
    <Session>
      <Document />
    </Session>
  )
}

export default Page;