import { useQuery } from '@tanstack/react-query';
import Router from 'next/router';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
// Component
import { AntCard, TableCard } from './Card';
// Query
import { getConsents, getPIPPs, getServices } from '@/models/apis/service';
// Query key
import { KEY_CONSENTS, KEY_PIITEMS, KEY_PIPPS, KEY_SERVICES } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';
import { getPIItems } from '@/models/apis/service';
import { Modal, Table, Tag } from 'antd';
import Link from 'next/link';

const StyledService = styled.div`
  align-items: center;
  // background-color: #FFFFFF;
  border-bottom: 1px dashed #F0F0F0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  transition: all 0.3s;
  user-select: none;
  &:hover {
    background-color: #FAFAFA;
  }
  &:last-child {
    border-bottom: 0;
  }
  .createAt {
    color: #BFBFBF;
    cursor: pointer;
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

interface ServiceProps {
  createAt: number;
  id: string;
  name: string;
}
interface ServicesProps {
  companyId: string;
}

const Service: React.FC<ServiceProps> = ({ createAt, id, name }): JSX.Element => {
  /** [Event handler] 서비스 아이템 클릭 이벤트 */
  const onClick = useCallback(() => Router.push(`/service/${id}`), [id]);
  // 컴포넌트 반환
  return (
    <StyledService onClick={onClick}>
      <h4 className='name'>{name}</h4>
      <label className='createAt'>{transformToDate(createAt)}</label>
    </StyledService>
  );
}

export const Services: React.FC<ServicesProps> = ({ companyId }) => {
  // API 호출
  const { isLoading, data: services } = useQuery([KEY_SERVICES, companyId], async () => await getServices(companyId));
  // 컴포넌트 반환
  return (
    <TableCard title='서비스 목록' loading={isLoading}>
      {services ? services.map((service: any): JSX.Element => (<Service createAt={service.createAt} id={service.id} key={service.id} name={service.serviceName} />)) : (<></>)}
    </TableCard>
  );
}

export const PIItems: React.FC<any> = ({ serviceId }) => {
  // API 호출
  const { isLoading, data: items } = useQuery([KEY_PIITEMS, serviceId], async () => await getPIItems(serviceId));
  // 컴포넌트 반환
  return (
    <AntCard></AntCard>
  );
}

export const Consents: React.FC<any> = ({ serviceId }) => {
  // API 호출
  const { isLoading, data } = useQuery([KEY_CONSENTS, serviceId], async () => await getConsents(serviceId));

  /** [Render] 유형 */
  const onRenderForType = useCallback((value: string): JSX.Element => (<Tag color='geekblue'>{value}</Tag>), []);
  /** [Render] 제목 */
  const onRenderForTitle = useCallback((value: string, record: any): JSX.Element => (
    <Link href={record.url} passHref>
      <a target='_blank' rel='noopener noreferrer'>{value}</a>
    </Link>
  ), []);

  // Card extra
  const extra: JSX.Element = useMemo(() => (<p style={{ margin: 0 }}>총 개수 : <b>{data ? data.length : 0}</b></p>), [data]);
  // 컴포넌트 반환
  return (
    <TableCard extra={extra} title='동의서'>
      <Table columns={[
        { dataIndex: 'type', key: 'type', title: '유형', render: onRenderForType, width: '20%' },
        { dataIndex: 'title', key: 'title', title: '제목', render: onRenderForTitle, width: '55%' },
        { dataIndex: 'publishedAt', key: 'publishedAt', title: '게시일자', render: (value: number): string => transformToDate(value), width: '25%' }
      ]} dataSource={data ? data : []} loading={isLoading} showSorterTooltip={false} />
    </TableCard>
  );
}

export const PIPPs: React.FC<any> = ({ serviceId }) => {
  // API 호출
  const { isLoading, data } = useQuery([KEY_PIPPS, serviceId], async () => await getPIPPs(serviceId));

  /** [Render] 버전 */
  const onRenderForVersion = useCallback((value: number): JSX.Element => value === 0 ? (<Tag color='default'>이전 처리방침</Tag>) : (<Tag color='geekblue'>Version {value}</Tag>), []);
  /** [Event handler] 행 클릭 */
  const onRow = useCallback((record: any) => ({
    onClick: () => window.open(record.url, '_blank')
  }), []);

  // Card extra
  const extra: JSX.Element = useMemo(() => (<p style={{ margin: 0 }}>총 개수 : <b>{data ? data.length : 0}</b></p>), [data]);
  // 컴포넌트 반환
  return (
    <TableCard extra={extra} title='개인정보 처리방침'>
      <Table columns={[
        { dataIndex: 'version', key: 'version', title: '버전', render: onRenderForVersion, width: '65%' },
        { dataIndex: 'applyAt', key: 'applyAt', title: '적용일', render: (value: number): string => value > 0 ? transformToDate(value) : '-', width: '35%' },
      ]} dataSource={data ? data : []} loading={isLoading} showSorterTooltip={false} onRow={onRow} />
    </TableCard>
  );
}