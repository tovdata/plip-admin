import { useQuery } from '@tanstack/react-query';
// Component
import { Col, Row, Spin } from 'antd';
import { StyledDashboard, StyledDashboardCard, StyledManager, StyledService, StyledServiceList, StyledUserList, StyledUserListHeader } from '@/components/styles/Company';
import { PageHeader } from '@/components/Header';
import { BasicTable } from '@/components/Table';
// Query
import { getCompanies, getManager, getServices, getUsers } from '@/models/apis/company';
// Query key
import { KEY_COMPANIES, KEY_MANAGER, KEY_SERVICES, KEY_USERS } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';
import { StyledPageContainerXL } from './styles/Layout';

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
  return (
    <StyledDashboard>
      <StyledPageContainerXL>
        <PageHeader isBack onEvent={onInit} title={company.name} style={{ marginBottom: 28 }} />
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Manager companyId={company.id} />
          </Col>
          <Col span={12}>
            <ServiceList companyId={company.id} />
          </Col>
          <Col span={12}>
            <UserList companyId={company.id} />
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
        {title ? (<h4 className='title'>{title}</h4>) : (<></>)}
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
const ServiceList: React.FC<any> = ({ companyId }): JSX.Element => {
  // 서비스 목록 조회
  const { isLoading, data: services } = useQuery([KEY_SERVICES], async () => await getServices(companyId));
  // 컴포넌트 반환
  return (
    <DashboardItem loading={isLoading} title='서비스 목록'>
      <StyledServiceList>
        {services ? services.map((service: any): JSX.Element => (<Service createAt={service.createAt} key={service.key} serviceId={service.id} serviceName={service.serviceName} />)) : (<></>)}
      </StyledServiceList>
    </DashboardItem>
  );
}
/** [Internal Component] 회사 내 사용자 목록 */
const UserList: React.FC<any> = ({ companyId }): JSX.Element => {
  // 서비스 목록 조회
  const { isLoading, data: users } = useQuery([KEY_USERS], async () => await getUsers(companyId));
  // 컴포넌트 반환
  return (
    <DashboardItem loading={isLoading} title='사용자 목록'>
      <StyledUserListHeader>
        <Row gutter={8}>
          <Col span={4}>이름</Col>
          <Col span={8}>이메일</Col>
          <Col span={6}>연락처</Col>
          <Col span={6}>가입일</Col>
        </Row>
      </StyledUserListHeader>
      <StyledUserList>
        <Row gutter={[8, 8]}>
          {users ? users.map((user: any): JSX.Element => (
            <>
              <Col span={4}>{user.userName}</Col>
              <Col span={8}>{user.email}</Col>
              <Col span={6}>{user.contact}</Col>
              <Col span={6}>{transformToDate(user.createAt)}</Col>
            </>
          )) : (<></>)}
        </Row>
      </StyledUserList>
    </DashboardItem>
  );
}