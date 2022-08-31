import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
// Component
import Layout from '@/components/atoms/Layout';
import { AntCard, SimpleCard, TableCard } from '@/components/atoms/Card';
import { PageHeader } from '@/components/atoms/Header';
import { Card, Col, Row, Space, Spin, Table } from 'antd';
// Icon
const IoCheckbox = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCheckbox));
const IoSquareOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoSquareOutline));
// Query
import { getCompany, getServices, getUsers } from '@/models/apis/company';
// Query key
import { KEY_COMPANY, KEY_SERVICES, KEY_USERS } from '@/models/type';
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
const StyledService = styled.div`
  align-items: center;
  border-bottom: 1px dashed #F0F0F0;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  &:last-child {
    border-bottom: 0;
  }
  .createAt {
    color: #BFBFBF;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
  }
  .name {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    margin: 0;
  }
`;

const Company: React.FC<any> = ({ companyId }): JSX.Element => {
  // API 호출
  const { data: company } = useQuery([KEY_COMPANY], async () => await getCompany(companyId));

  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {company === undefined ? (<></>) : (
        <>
          <PageHeader isBack title={company.companyName} />
          <Manager manager={company.manager} />
          <Row gutter={24}>
            <Col lg={6} sm={12} span={24}>
              <SimpleCard title='서비스 수'>{company.services ? company.services.length.toString() : '0'}</SimpleCard>
            </Col>
            <Col lg={6} sm={12} span={24}>
              <SimpleCard title='사용자 수'>{company.employees ? company.employees.length.toString() : '0'}</SimpleCard>
            </Col>
            <Col lg={6} sm={12} span={24}>
              <SimpleCard title='사용자 수'>{company.employees ? company.employees.length.toString() : '0'}</SimpleCard>
            </Col>
            <Col lg={6} sm={12} span={24}>
              <SimpleCard title='사용자 수'>{company.employees ? company.employees.length.toString() : '0'}</SimpleCard>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={6} lg={8} span={24}>
              <Services companyId={companyId} />
            </Col>
            <Col xl={18} lg={16} span={24}>
              <Users companyId={companyId} />
            </Col>
          </Row>
        </>
      )}
    </Layout>
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

const Services: React.FC<any> = ({ companyId }): JSX.Element => {
  // API 호출
  const { data: services } = useQuery([KEY_SERVICES], async () => await getServices(companyId));
  // 컴포넌트 반환
  return (
    <TableCard title='서비스 목록'>
      {services ? services.map((service: any): JSX.Element => (<Service createAt={service.createAt} key={service.id} name={service.serviceName} />)) : (<></>)}
    </TableCard>
  );
}
const Service: React.FC<any> = ({ createAt, name }): JSX.Element => {
  return (
    <StyledService>
      <h4 className='name'>{name}</h4>
      <label className='createAt'>{transformToDate(createAt)}</label>
    </StyledService>
  );
}

const Users: React.FC<any> = ({ companyId }): JSX.Element => {
  // API 호출
  const { isLoading, data: users } = useQuery([KEY_USERS], async () => await getUsers(companyId));
  // 컴포넌트 반환
  return (
    <TableCard title='사용자 목록'>
      <Table columns={[
        { dataIndex: 'userName', key: 'userName', title: '이름', width: '15%' },
        { dataIndex: 'email', key: 'email', title: '이메일', width: '30%' },
        { dataIndex: 'contact', key: 'contact', title: '연락처', width: '22%' },
        { dataIndex: 'createAt', key: 'createAt', title: '가입일', render: (value: number): string => transformToDate(value), width: '22%' },
        { dataIndex: 'marketing', key: 'marketing', title: '마케팅', render: (value: any): JSX.Element => value === true ? (<span className='icon'><IoCheckbox /></span>) : (<span className='icon'><IoSquareOutline /></span>), width: '11%' }
      ]} dataSource={users ? users : []} loading={isLoading} showSorterTooltip={false} size='middle' />
    </TableCard>
  )
}

export default Company;