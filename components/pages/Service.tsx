import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import Layout from '@/components/atoms/Layout';
import { PageLoading } from '@/components/atoms/Loading';
import { Card, Col, Descriptions, PageHeader, Row, Tag } from 'antd';
import Link from 'next/link';
// Query
import { getCompany } from '@/models/apis/company';
import { getService } from '@/models/apis/service';
// Query key
import { KEY_SERVICE } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';
import { Consents, PIItems, PIPPs } from '../atoms/Service';
import { AntCard } from '../atoms/Card';

const StyledModifiedAt = styled.div`
  user-select: none;
  .label {
    color: #8C8C8C;
    display: block;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
  }
  .content {
    color: #030852;
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
  // API 호출
  const { data: service } = useQuery([KEY_SERVICE], async () => await getService(serviceId));
  /** [Event handler] 뒤로가기 */
  const onBack = useCallback(() => window.history.back(), []);
  // 회사 정보 조회
  useEffect(() => {
    if (service) {
      (async () => {
        // API 호출
        const response: any = await getCompany(service.companyId);
        if (response) {
          setCompany(response.companyName);
        }
      })();
    }
  }, [service]);

  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {service === undefined ? (
        <PageLoading />
      ) : (
        <>
          <PageHeader ghost={false} onBack={onBack} title={service.serviceName} style={{ marginBottom: 24 }}>
            <Descriptions size='small'>
              <Descriptions.Item label='담당회사'>
                <Link passHref href={`/company/${service.companyId}`}>
                  <a>{company}</a>
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label='생성일자'>{transformToDate(service.createAt)}</Descriptions.Item>
              <Descriptions.Item label='서비스 유형'>
                <>{service.types.map((type: string): JSX.Element => (<Tag key={type}>{type}</Tag>))}</>
              </Descriptions.Item>
              <Descriptions.Item label='URL' span={3}>{service.url ? service.url : 'none'}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <ModifiedAt modifiedAt={service.lastModifiedAt} />
          {/* <Row gutter={24}>
            <Col span={12}>
              <PIItems serviceId={service.id} />
            </Col>
            <Col span={6}>
              <CPIItems serviceId={service.id} />
            </Col>
            <Col span={6}>
              <PPIItems serviceId={service.id} />
            </Col>
          </Row> */}
          <Row gutter={24}>
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

const ModifiedAt: React.FC<any> = ({ modifiedAt }): JSX.Element => {
  return (
    <AntCard title='데이터 및 문서 수정일'>
      <Row gutter={[12, 16]}>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='수집 및 이용'>{modifiedAt.pi_fni && modifiedAt.pi_fni.modifiedAt ? transformToDate(modifiedAt.pi_fni.modifiedAt) : ''}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='제3자 제공/위탁'>{modifiedAt.ppi_cpi_pfni_cfni && modifiedAt.ppi_cpi_pfni_cfni.modifiedAt ? transformToDate(modifiedAt.ppi_cpi_pfni_cfni.modifiedAt) : ''}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='파기'>{modifiedAt.dpi && modifiedAt.dpi.modifiedAt ? transformToDate(modifiedAt.dpi.modifiedAt) : ''}</ModifiedAtItem>
        </Col>
        <Col xl={5} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='동의서'>{modifiedAt.consent && modifiedAt.consent.modifiedAt ? transformToDate(modifiedAt.consent.modifiedAt) : ''}</ModifiedAtItem>
        </Col>
        <Col xl={4} lg={6} md={8} sm={12} span={24}>
          <ModifiedAtItem label='개인정보 처리방침'>{modifiedAt.pipp && modifiedAt.pipp.modifiedAt ? transformToDate(modifiedAt.pipp.modifiedAt) : ''}</ModifiedAtItem>
        </Col>
      </Row>
    </AntCard>
  );
}
const ModifiedAtItem: React.FC<any> = ({ children, label }): JSX.Element => {
  return (
    <StyledModifiedAt>
      <label className='label'>{label}</label>
      <div className='content'>{children}</div>
    </StyledModifiedAt>
  );
}

export default Page;