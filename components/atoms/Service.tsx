import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
// Chart
import { Bullet } from '@ant-design/plots';
// Component
import { Description } from '@/components/atoms/Description';
import { TableCard } from '@/components/atoms/Card';
import CpiPpiForm from '@/components/atoms/CPI_PPI';
import { Col, Row, Table, Tag } from 'antd';
import Link from 'next/link';
// Query
import { getConsents, getCPIs, getPICount, getPIItems, getPIPPs, getPPIs, getServices } from '@/models/apis/service';
// Query key
import { KEY_CONSENTS, KEY_CPIS, KEY_PIITEMS, KEY_PIPPS, KEY_PIS, KEY_PPIS, KEY_SERVICES } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';

const StyledChartForm = styled.div`
  margin-top: 16px;
  canvas {
    height: 78px !important;
  }
  label {
    margin-bottom: -8px !important;
  }
`;
const StyledService = styled.a`
  align-items: center;
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
  return (
    <Link href={`/service/${id}`} passHref>
      <StyledService>
        <h4 className='name'>{name}</h4>
        <label className='createAt'>{transformToDate(createAt)}</label>
      </StyledService>
    </Link>
  );
}

export const Services: React.FC<ServicesProps> = ({ companyId }): JSX.Element => {
  // API 호출
  const { isLoading, data: services } = useQuery([KEY_SERVICES, companyId], async () => await getServices(companyId));
  // 컴포넌트 반환
  return (
    <TableCard title='서비스 목록' loading={isLoading}>
      {services ? services.map((service: any): JSX.Element => (<Service createAt={service.createAt} id={service.id} key={service.id} name={service.serviceName} />)) : (<></>)}
    </TableCard>
  );
}

export const CPI: React.FC<any> = ({ serviceId }): JSX.Element => {
  // API 호출
  const { data } = useQuery([KEY_CPIS, serviceId], async () => await getCPIs(serviceId));
  // 컴포넌트 반환
  return (
    <>
      {data ? (<CpiPpiForm data={data} type='cpi' />) : (<></>)}
    </>
  );
}

export const PPI: React.FC<any> = ({ serviceId }): JSX.Element => {
  // API 호출
  const { data } = useQuery([KEY_PPIS, serviceId], async () => await getPPIs(serviceId));
  // 컴포넌트 반환
  return (
    <>
      {data ? (<CpiPpiForm data={data} type='ppi' />) : (<></>)}
    </>
  );
}

export const PIItems: React.FC<any> = ({ serviceId }): JSX.Element => {
  // API 호출
  const { data: subjects } = useQuery([KEY_PIS, serviceId], async () => await getPICount(serviceId));
  const { data: items } = useQuery([KEY_PIITEMS, serviceId], async () => await getPIItems(serviceId));

  // 업무 수
  const subjectCount: number = useMemo(() => subjects ? subjects : 0, [subjects]);
  // 중복을 제거한 총 항목 수
  const itemCount: number = useMemo(() => items && items.allItems ? items.allItems.length : 0, [items]);
  // 차트 데이터
  const data: any[] = useMemo(() => {
    if (items && ('essentialItemsOnly' in items) && ('selectionItemsOnly' in items)) {
      const total: number = items.essentialItemsOnly.length + items.selectionItemsOnly.length;
      return [{
        title: '',
        ranges: [total],
        measures: [items.essentialItemsOnly.length, items.selectionItemsOnly.length],
        target: total
      }];
    } else {
      return [{
        title: '',
        ranges: [0],
        measures: [0, 0],
        target: 0
      }];
    }
  }, [items]);
  // 차트 설정
  const config: any = useMemo(() => ({
    data,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    color: {
      range: ['#ffffff'],
      measure: ['#1890ff', '#91d5ff'],
    },
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
        },
      },
    },
    xAxis: false,
    yAxis: false,
    tooltip: {
      showMarkers: false,
      showTitle: false,
      formatter: (data: any) => ({ name: data.mKey === 'measures_0' ? '필수항목' : '선택항목', value: data.measures })
    },
    legend: {
      custom: true,
      // position: 'bottom',
      items: [
        {
          value: 'essential',
          name: '필수항목',
          marker: {
            symbol: 'square',
            style: {
              fill: '#1890ff'
            },
          },
        },
        {
          value: 'selection',
          name: '선택항목',
          marker: {
            symbol: 'square',
            style: {
              fill: ' #91d5ff'
            },
          },
        },
      ],
    }
  }), [data]);

  // 컴포넌트 반환
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Description label='업무 수'>{subjectCount}</Description>
        </Col>
        <Col span={8}>
          <Description label={<>항목 수 <small>(중복 제거)</small></>}>{itemCount}</Description>
        </Col>
      </Row>
      <StyledChartForm>
        <Description label='항목 비율'>{<Bullet { ...config } />}</Description>
      </StyledChartForm>
    </>
  );
}

export const Consents: React.FC<any> = ({ serviceId }): JSX.Element => {
  // API 호출
  const { isLoading, data } = useQuery([KEY_CONSENTS, serviceId], async () => await getConsents(serviceId));

  /** [Render] 유형 */
  const onRenderForType = useCallback((value: string): JSX.Element => (<Tag color='geekblue'>{value}</Tag>), []);
  /** [Event handler] 행 클릭 */
  const onRow = useCallback((record: any) => ({
    onClick: () => window.open(record.url, '_blank')
  }), []);

  // Card extra
  const extra: JSX.Element = useMemo(() => (<p style={{ margin: 0 }}>총 개수 : <b>{data ? data.length : 0}</b></p>), [data]);
  // 컴포넌트 반환
  return (
    <TableCard extra={extra} title='동의서'>
      <Table columns={[
        { dataIndex: 'type', key: 'type', title: '유형', render: onRenderForType, width: '20%' },
        { dataIndex: 'title', key: 'title', title: '제목', width: '55%' },
        { dataIndex: 'publishedAt', key: 'publishedAt', title: '게시일자', render: (value: number): string => transformToDate(value), width: '25%' }
      ]} dataSource={data ? data : []} loading={isLoading} showSorterTooltip={false} size='middle' onRow={onRow} />
    </TableCard>
  );
}

export const PIPPs: React.FC<any> = ({ serviceId }): JSX.Element => {
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
      ]} dataSource={data ? data : []} loading={isLoading} showSorterTooltip={false} size='middle' onRow={onRow} />
    </TableCard>
  );
}