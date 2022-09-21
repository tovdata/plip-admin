import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
// Component
import { ItemCard } from '@/components/atoms/Card';
import { PageHeader } from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import { PageLoading } from '@/components/atoms/Loading';
import { Services } from '@/components/atoms/Service';
import { Users } from '@/components/atoms/User';
import { Breadcrumb, Card, Col, Row, Skeleton } from 'antd';
import Link from 'next/link';
// Query
import { getCompany } from '@/models/apis/company';
// Query key
import { KEY_COMPANY } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';

const StyledManager = styled.div`
  margin-bottom: 16px;
  .ant-card-body {
    align-items: center;
    display: flex;
    padding: 16px 24px;
    .ant-skeleton-title {
      margin-bottom: 0;
    }
  }
`;
const StyledManagerInfo = styled.div`
  color: #3F3D56;
  margin-right: 86px;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
  .label {
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin-right: 24px;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
  }
`;

const Page: React.FC<any> = ({ companyId }): JSX.Element => {
  // API 호출
  const { isLoading, data: company } = useQuery([KEY_COMPANY], async () => await getCompany(companyId));
  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {company === undefined ? (<PageLoading />) : (<Company company={company} loading={isLoading} />)}
    </Layout>
  );
}

const Company: React.FC<any> = ({ company, loading }): JSX.Element => {
  // Extra
  const breadcrumb: JSX.Element = useMemo(() => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href='/' passHref>
          <a>대시보드</a>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a>회사관리</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  ), []);
  // 컴포넌트 반환
  return (
    <>
      <PageHeader breadcrumb={breadcrumb} ghost title={company ? company.companyName : ''} />
      <Manager manager={company ? company.manager : undefined} />
      <Row gutter={16}>
        <Col lg={6} sm={12} span={24}>
          <ItemCard small loading={loading} title='생성일자'>{company ? transformToDate(company.createAt) : ''}</ItemCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <ItemCard small loading={loading} title='서비스 수'>{company && company.services ? company.services.length.toString() : '0'}</ItemCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <ItemCard small loading={loading} title='Title'>-</ItemCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <ItemCard small loading={loading} title='Title'>-</ItemCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xl={6} lg={8} span={24}>
          <Services companyId={company.id} />
        </Col>
        <Col xl={18} lg={16} span={24}>
          <Users companyId={company.id} />
        </Col>
      </Row>
    </>
  );
}

const Manager: React.FC<any> = ({ manager }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 200);
  }, []);

  return (
    <StyledManager>
      <Card title='개인정보 보호책임자'>
        <Skeleton active loading={loading} paragraph={false} title={{ width: '55%' }}>
          <ManagerInfo label='이름'>{manager ? manager.name : ''}</ManagerInfo>
          <ManagerInfo label='직책/직위'>{manager ? manager.position : ''}</ManagerInfo>
          <ManagerInfo label='이메일'>{manager ? manager.email : ''}</ManagerInfo>
        </Skeleton>
      </Card>
    </StyledManager>
  );
}
const ManagerInfo: React.FC<any> = ({ children, label }): JSX.Element => {
  return (
    <StyledManagerInfo>
      <label className='label'>{label}</label>
      <label className='text'>{children}</label>
    </StyledManagerInfo>
  );
}

export default Page;