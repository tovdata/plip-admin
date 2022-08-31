import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Component
const Session: ComponentType<any> = dynamic(() => import('@/components/Session'), { loading: () => (<></>), ssr: false });
import Service from '@/components/pages/Service';
// Type
import type { ComponentType } from 'react';

const Page: NextPage = () => {
  const router = useRouter();
  // Get a path parameter
  const { id } = router.query;
  // Component
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // Render
  useEffect(() => typeof id === 'string' ? setComponent(<Service serviceId={id} />) : undefined, [id]);

  return (
    <Session>
      {component}
    </Session>
  )
}

export default Page;