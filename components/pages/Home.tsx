import { useQuery } from '@tanstack/react-query';
import Router from 'next/router';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Component
import { SimpleCard, TableCard } from '@/components/atoms/Card';
import Layout from '@/components/atoms/Layout';
import { Col, Row, Table } from 'antd';
// Query
import { getCompanies } from '@/models/apis/company';
// Query key
import { KEY_COMPANIES } from '@/models/type';
// State
import { companyCountSelector, serviceCountSelector, userCountSelector } from '@/models/state';
// Util
import { transformToDate } from 'utils/util';


const Home: React.FC<any> = (): JSX.Element => {
  const companyCount: number = useRecoilValue(companyCountSelector);
  const serviceCount: number = useRecoilValue(serviceCountSelector);
  const userCount: number = useRecoilValue(userCountSelector);

  return (
    <Layout selectedKey='management'>
      <Row gutter={24}>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='전체 회사 수'>{companyCount.toString()}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='전체 서비스 수'>{serviceCount.toString()}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='전체 가입자 수'>{userCount.toString()}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='전체 가입자 수'>10</SimpleCard>
        </Col>
      </Row>
      <TableCard title='회사 목록'>
        <Companies />
      </TableCard>
      <TableCard title='가입자 목록'>
        <Users />
      </TableCard>
    </Layout>
  );
}

const Companies: React.FC<any> = (): JSX.Element => {
  // API 호출
  const { isLoading, data: companies } = useQuery([KEY_COMPANIES], async () => await getCompanies());
  // 전체 회사 및 서비스 수
  const setCompanyCount = useSetRecoilState(companyCountSelector);
  const setServiceCount = useSetRecoilState(serviceCountSelector);
  // 전체 회사 및 서비스 수 설정
  useEffect(() => {
    setCompanyCount(companies ? companies.length : 0);
    setServiceCount(companies ? companies.reduce((result: number, elem: any): number => result + elem.services.length, 0) : 0);
  }, [companies]);
  const onRow = useCallback((record: any) => ({
    onClick: () => Router.push(`/company/${record.id}`)
  }), []);

  // 컴포넌트 반환
  return (
    <Table columns={[
      { dataIndex: 'companyName', key: 'companyName', title: '회사 이름', width: '26%' },
      { dataIndex: 'url', key: 'url', title: 'URL', width: '34%' },
      { dataIndex: 'services', key: 'services', title: '서비스 수', render: (values: string[]): number => values.length, width: '12%' },
      { dataIndex: 'employees', key: 'employees', title: '회원 수', render: (values: string[]): number => values.length, width: '12%' },
      { dataIndex: 'createAt', key: 'createAt', title: '생성일', render: (value: number): string => transformToDate(value), sortDirections: ['ascend'], sorter: (a: any, b: any): number => b.createAt - a.createAt, width: '16%' }
    ]} dataSource={companies} loading={isLoading} showSorterTooltip={false} size='middle' onRow={onRow} />
  );
}

const Users: React.FC<any> = (): JSX.Element => {
  return (
    <Table columns={[
      { dataIndex: 'userName', key: 'userName', title: '이름' },
      { dataIndex: 'affiliations', key: 'affiliations', title: '소속' },
      { dataIndex: 'createAt', key: 'createAt', title: '가입일' },
    ]} showSorterTooltip={false} size='middle' />
  );
}

export default Home;