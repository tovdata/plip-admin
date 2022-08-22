import { useQuery } from '@tanstack/react-query';
// Component
import { Col, Row, Spin, Table } from 'antd';
import { StyledDashboard, StyledDashboardCard, StyledManager, StyledService, StyledServiceList } from '@/components/styles/Company';
import { PageHeader } from '@/components/Header';
import { BasicTable } from '@/components/Table';
import { StyledPageContainerXL } from '@/components/styles/Layout';
// Icon
const IoCheckbox = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCheckbox));
const IoSquareOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoSquareOutline));
// Query
import { getCompanies, getManager, getServices, getUsers } from '@/models/apis/company';
// Query key
import { KEY_COMPANIES, KEY_MANAGER, KEY_SERVICES, KEY_USERS } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';
import dynamic from 'next/dynamic';

/** [Component] 가입된 회사 목록 테이블 */
export const CompanyList: React.FC<any> = ({ onSelect }): JSX.Element => {
  // 가입된 회사 목록 조회
  const { isLoading, data: companies } = useQuery([KEY_COMPANIES], async () => await getCompanies());
  // 컴포넌트 반환
  return (
    <>
      <PageHeader isBack title='가입 회사 목록' />
      <BasicTable columns={[
        { dataIndex: 'companyName', key: 'companyName', title: '회사명', width: '40%' },
        { dataIndex: 'url', key: 'url', title: 'URL', width: '40%' },
        { dataIndex: 'createAt', key: 'createAt', title: '생성일자', render: (value: number): string => transformToDate(value), sortDirections: ['descend'], sorter: ((a: any, b: any): number => b.regAt - a.regAt), width: '20%' },
      ]} dataSource={companies ? companies : []} loading={isLoading} onSelect={onSelect} />
    </>
  );
}
/** [Component] 회사 대시보드 */
export const Dashboard: React.FC<any> = ({ company, onInit }): JSX.Element => {
  // 서비스 목록 조회
  const { isLoading: loadingServices, data: services } = useQuery([KEY_SERVICES], async () => await getServices(company.id));
  // 서비스 목록 조회
  const { isLoading: loadingUsers, data: users } = useQuery([KEY_USERS], async () => await getUsers(company.id));

  // 컴포넌트 반환
  return (
    <StyledDashboard>
      <StyledPageContainerXL>
        <PageHeader isBack onEvent={onInit} title={company.name} style={{ marginBottom: 28 }} />
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Manager companyId={company.id} />
          </Col>
          <Col span={6}>
            <Count count={services ? services.length : 0} isLoading={loadingServices} title='서비스 개수' />
          </Col>
          <Col span={6}>
            <Count count={users ? users.length : 0} isLoading={loadingUsers} title='사용자 수' />
          </Col>
          <Col span={6}></Col>
          <Col span={6}></Col>
          <Col span={8}>
            <ServiceList isLoading={loadingServices} services={services} />
          </Col>
          <Col span={16}>
            <UserList isLoading={loadingUsers} users={users} />
          </Col>
        </Row>
      </StyledPageContainerXL>
    </StyledDashboard>
  )
}

/** [Internal Component] 대시보드 아이템 */
const DashboardItem: React.FC<any> = ({ children, loading, title }): JSX.Element => {
  return (
    <StyledDashboardCard>
      <Spin spinning={loading}>
        {title ? (<h4 className='header'>{title}</h4>) : (<></>)}
        {children}
      </Spin>
    </StyledDashboardCard>
  );
}
/** [Internal Component] 회사 개인정보 보호책임자 */
const Manager: React.FC<any> = ({ companyId }): JSX.Element => {
  // 개인정보 보호책임자 조회
  const { isLoading, data: manager } = useQuery([KEY_MANAGER], async () => await getManager(companyId));
  // 컴포넌트 반환
  return (
    <DashboardItem loading={isLoading}>
      <StyledManager>
        <h3 className='header'>개인정보 보호책임자 <span className='icon'>👑</span></h3>
        <div className='description'>
          <ManagerDetail label='이름' text={manager ? manager.name : ''} />
          <ManagerDetail label='직책/직위' text={manager ? manager.position : ''} />
          <ManagerDetail label='이메일' text={manager ? manager.email : ''} />
        </div>
      </StyledManager>
    </DashboardItem>
  );
}
/** [Internal Component] 개인정보 보호책임자 정보 */
const ManagerDetail: React.FC<any> = ({ label, text }): JSX.Element => {
  return (
    <div className='item'>
      <label className='label'>{label}</label>
      <label className='text'>{text}</label>
    </div>
  );
}
/** [Internal Component] 서비스 개수 조회 */
const Count: React.FC<any> = ({ count, isLoading, title }): JSX.Element => {
  return (
    <DashboardItem loading={isLoading} title={title}>
      <div style={{ alignItems: 'center', display: 'flex', fontSize: 21, fontWeight: '600', justifyContent: 'flex-end', padding: '8px 20px' }}>{count}</div>
    </DashboardItem>
  );
}
/** [Internal Component] 서비스 아이템 */
const Service: React.FC<any> = ({ createAt, serviceId, serviceName }): JSX.Element => {
  return (
    <StyledService>
      <h5 className='name'>{serviceName}</h5>
      <span className='date'>{transformToDate(createAt)}</span>
    </StyledService>
  );
}
/** [Internal Component] 회사 내 서비스 목록 */
const ServiceList: React.FC<any> = ({ isLoading, services }): JSX.Element => {
  return (
    <DashboardItem loading={isLoading} title='서비스 목록'>
      <StyledServiceList>
        {services ? services.map((service: any): JSX.Element => (<Service createAt={service.createAt} key={service.key} serviceId={service.id} serviceName={service.serviceName} />)) : (<></>)}
      </StyledServiceList>
    </DashboardItem>
  );
}
/** [Internal Component] 회사 내 사용자 목록 */
const UserList: React.FC<any> = ({ isLoading, users }): JSX.Element => {
  return (
    <DashboardItem loading={isLoading} title='사용자 목록'>
      <Table columns={[
        { dataIndex: 'userName', key: 'userName', title: '이름', width: '15%' },
        { dataIndex: 'email', key: 'email', title: '이메일', width: '30%' },
        { dataIndex: 'contact', key: 'contact', title: '연락처', width: '22%' },
        { dataIndex: 'createAt', key: 'createAt', title: '가입일', render: (value: number): string => transformToDate(value), width: '22%' },
        { dataIndex: 'marketing', key: 'marketing', title: '마케팅', width: '11%', render: (value: any): JSX.Element => value === true ? (<span className='icon'><IoCheckbox /></span>) : (<span className='icon'><IoSquareOutline /></span>) },
      ]} dataSource={users ? users : []} size='small' />
    </DashboardItem>
  );
}