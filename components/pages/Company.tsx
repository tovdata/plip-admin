import Layout from '@/components/atoms/Layout';
import { PageHeader } from '@/components/atoms/Header';

const Company: React.FC<any> = (): JSX.Element => {
  return (
    <Layout selectedKey='management'>
      <PageHeader isBack title='hi' />
    </Layout>
  );
}

export default Company;