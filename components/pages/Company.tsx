import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
// Component
import Layout from '@/components/atoms/Layout';
import { SimpleCard } from '@/components/atoms/Card';
import { PageHeader } from '@/components/atoms/Header';
import { Card, Col, Row } from 'antd';
import { Services } from '@/components/atoms/Service';
import { Users } from '@/components/atoms/User';
// Query
import { getCompany } from '@/models/apis/company';
// Query key
import { KEY_COMPANY } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';

const StyledManager = styled.div`
  margin-bottom: 24px;
  .ant-card-body {
    align-items: center;
    display: flex;
    padding: 16px 24px;
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
  const { data: company } = useQuery([KEY_COMPANY], async () => await getCompany(companyId));
  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {company === undefined ? (<></>) : (<Company company={company} />)}
    </Layout>
  );
}

const Company: React.FC<any> = ({ company }): JSX.Element => {
  return (
    <>
      <PageHeader isBack title={company ? company.companyName : ''} />
      <Manager manager={company ? company.manager : undefined} />
      <Row gutter={24}>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='생성일자'>{company ? transformToDate(company.createAt) : ''}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='서비스 수'>{company && company.services ? company.services.length.toString() : '0'}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='사용자 수'>{company && company.employees ? company.employees.length.toString() : '0'}</SimpleCard>
        </Col>
        <Col lg={6} sm={12} span={24}>
          <SimpleCard title='사용자 수'>{company && company.employees ? company.employees.length.toString() : '0'}</SimpleCard>
        </Col>
      </Row>
      <Row gutter={24}>
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
  return (
    <StyledManager>
      <Card title='개인정보 보호책임자'>
        <ManagerInfo label='이름'>{manager ? manager.name : ''}</ManagerInfo>
        <ManagerInfo label='직책/직위'>{manager ? manager.position : ''}</ManagerInfo>
        <ManagerInfo label='이메일'>{manager ? manager.email : ''}</ManagerInfo>
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