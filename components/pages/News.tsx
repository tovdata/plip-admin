// Component
import Layout from '@/components/atoms/Layout';
import { PageHeader } from '../Header';

const Page: React.FC<any> = (): JSX.Element => {
  return (
    <Layout selectedKey='news'>
      <PageHeader isBack title='뉴스 목록' />
    </Layout>
  );
}

export default Page;