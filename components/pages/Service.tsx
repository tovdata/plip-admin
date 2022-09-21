import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
// Component
import { AntCard, ItemCard } from '@/components/atoms/Card';
import { PageHeader } from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import { PageLoading } from '@/components/atoms/Loading';
import { Consents, CPI, PIItems, PIPPs, PPI } from '@/components/atoms/Service';
import { Breadcrumb, Button, Card, Col, Row } from 'antd';
import Link from 'next/link';
// Query
import { getCompany } from '@/models/apis/company';
import { getService } from '@/models/apis/service';
// Query key
import { KEY_SERVICE } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';
import Activity from '../atoms/Activity';

const StyledColumn = styled(Col)`
  border-right: 1px dashed #F0F0F0;
  padding-left: 24px;
  padding-right: 24px;
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
    padding-right: 0;
  }

  @media(max-width: 992px) {
    border-top: 1px dashed #F0F0F0;
    padding: 24px 0 0 0;
    border-right: none;
    &:first-child {
      border-top: none;
      padding-top: 0;
    }
  }
`;
const StyledModifiedAt = styled.div`
  user-select: none;
  .label {
    color: #8C8C8C;
    display: block;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 2px;
  }
  .content {
    color: #003a8c;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }
`;

interface ModifiedAtProps {
  children?: React.ReactNode;
  label: string;
}

const Page: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 회사
  const [company, setCompany] = useState<string>('');
  // 활동 내역 상태
  const [activity, setActivity] = useState<boolean>(false);
  // API 호출
  const { data: service } = useQuery([KEY_SERVICE], async () => await getService(serviceId));
  // 데이터 로딩
  const [loading, setLoading] = useState<boolean>(true);
  

  /** [Event handler] 활동 내역 보기 */
  const onActivity = useCallback(() => setActivity(true), []);
  /** [Event handler] 활동 내역 숨기기 */
  const onHide = useCallback(() => setActivity(false), []);

  // 회사 정보 조회
  useEffect(() => {
    if (service) {
      (async () => {
        // API 호출
        const response: any = await getCompany(service.companyId);
        if (response) {
          setCompany(response.companyName);
        }
        // 로딩 비활성화
        setLoading(false);
      })();
    }
  }, [service]);
  // Extra
  const breadcrumb: JSX.Element = useMemo(() => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href='/' passHref>
          <a>대시보드</a>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {service ? (
          <Link href={`/company/${service.companyId}`} passHref>
            <a>회사관리</a>
          </Link>
        ) : (<a>회사관리</a>)}
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a>서비스관리</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  ), [service]);

  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {service === undefined ? (
        <PageLoading />
      ) : activity ? (
        <Activity onBack={onHide} serviceId={serviceId} />
      ) : (
        <>
          <PageHeader breadcrumb={breadcrumb} ghost title={service.serviceName} />
          <Row gutter={16}>
            <Col lg={5} span={12}>
              <ItemCard small loading={loading} title='담당회사'>{company}</ItemCard>
            </Col>
            <Col lg={5} span={12}>
              <ItemCard small loading={loading} title='생성일자'>{transformToDate(service.createAt)}</ItemCard>
            </Col>
            <Col lg={5} span={12}>
              <ItemCard small loading={loading} title='서비스 유형'>{service.types}</ItemCard>
            </Col>
            <Col lg={9} span={12}>
              <ItemCard small loading={loading} title='URL'>None</ItemCard>
            </Col>
          </Row>
          <ModifiedAt modifiedAt={service.lastModifiedAt} onClick={onActivity} />
          <DataStatus serviceId={serviceId} />
          <Row gutter={16}>
            <Col xl={16} lg={14} span={24}>
              <Consents serviceId={serviceId} />
            </Col>
            <Col xl={8} lg={10} span={24}>
              <PIPPs serviceId={serviceId} />
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
}

const DataStatus: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 활성 탭 키
  const [activeTabKey, setActiveTabKey] = useState<string>('pi');
  
  /** [Event handler] 탭 변경 */
  const onTabChange = useCallback((key: string): void => setActiveTabKey(key), []);

  // 탭 목록
  const tabList: any[] = useMemo(() => [{ key: 'pi', tab: '개인정보' }, { key: 'fni', tab: '가명정보' }], []);
  // 탭 내용
  const tabContent: Record<string, React.ReactNode> = useMemo(() => ({
    'pi': (
      <Row gutter={[0, 16]}>
        <StyledColumn lg={12} xs={24}>
          <PIItems serviceId={serviceId} />
        </StyledColumn>
        <StyledColumn lg={6} xs={24}>
          <PPI serviceId={serviceId} />
        </StyledColumn>
        <StyledColumn lg={6} xs={24}>
          <CPI serviceId={serviceId} />
        </StyledColumn>
      </Row>
    ),
    'fni': (<>구현 예정입니다.</>)
  }), [serviceId]);

  // 컴포넌트 반환
  return (
    <Card style={{ marginBottom: 16 }} tabList={tabList} activeTabKey={activeTabKey} onTabChange={onTabChange}>{tabContent[activeTabKey]}</Card>
  );
}
const ModifiedAt: React.FC<any> = ({ modifiedAt, onClick }): JSX.Element => {
  const extra = (<Button onClick={onClick}>활동 내역</Button>)

  return (
    <AntCard title='데이터 및 문서 수정일' extra={extra}>
      <Row gutter={[12, 16]}>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='수집 및 이용'>{modifiedAt.pi_fni && modifiedAt.pi_fni.modifiedAt ? transformToDate(modifiedAt.pi_fni.modifiedAt) : '-'}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='제3자 제공/위탁'>{modifiedAt.ppi_cpi_pfni_cfni && modifiedAt.ppi_cpi_pfni_cfni.modifiedAt ? transformToDate(modifiedAt.ppi_cpi_pfni_cfni.modifiedAt) : '-'}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='파기'>{modifiedAt.dpi && modifiedAt.dpi.modifiedAt ? transformToDate(modifiedAt.dpi.modifiedAt) : '-'}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='동의서'>{modifiedAt.consent && modifiedAt.consent.modifiedAt ? transformToDate(modifiedAt.consent.modifiedAt) : '-'}</ModifiedAtItem>
        </Col>
        <Col xl={4} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='개인정보 처리방침'>{modifiedAt.pipp && modifiedAt.pipp.modifiedAt ? transformToDate(modifiedAt.pipp.modifiedAt) : '-'}</ModifiedAtItem>
        </Col>
      </Row>
    </AntCard>
  );
}
const ModifiedAtItem: React.FC<ModifiedAtProps> = ({ children, label }): JSX.Element => {
  return (
    <StyledModifiedAt>
      <label className='label'>{label}</label>
      <div className='content'>{children}</div>
    </StyledModifiedAt>
  );
} 

export default Page;