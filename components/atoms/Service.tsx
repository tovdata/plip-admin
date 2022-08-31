import { useQuery } from '@tanstack/react-query';
import Router from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
// Component
import { TableCard } from './Card';
// Query
import { getServices } from '@/models/apis/company';
// Query key
import { KEY_SERVICES } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';

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