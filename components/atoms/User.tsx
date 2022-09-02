import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
// Component
import { TableCard } from '@/components/atoms/Card';
import { Table } from 'antd';
// Icon
const IoCheckbox = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCheckbox));
const IoSquareOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoSquareOutline));
// Query
import { getUsers } from '@/models/apis/company';
// Query key
import { KEY_USERS } from '@/models/type';
// Util
import { transformToDate } from 'utils/util';

const MarketingBlock = styled.div`
  align-items: center;
  color: #8C8C8C;
  display: flex;
  font-size: 18px;
  justify-content: center;
`;

interface UsersProps {
  companyId: string;
}

export const Users: React.FC<UsersProps> = ({ companyId }): JSX.Element => {
  // API 호출
  const { isLoading, data: users } = useQuery([KEY_USERS, companyId], async () => await getUsers(companyId));
  // 컴포넌트 반환
  return (
    <TableCard title='사용자 목록'>
      <Table columns={[
        { dataIndex: 'userName', key: 'userName', title: '이름', width: '15%' },
        { dataIndex: 'email', key: 'email', title: '이메일', width: '30%' },
        { dataIndex: 'contact', key: 'contact', title: '연락처', width: '22%' },
        { dataIndex: 'createAt', key: 'createAt', title: '가입일', render: (value: number): string => transformToDate(value), sortDirections: ['ascend'], sorter: (a: any, b: any): number => a.createAt - b.createAt, width: '22%' },
        { dataIndex: 'marketing', key: 'marketing', title: '마케팅', filters: [{ text: '동의', value: true }, { text: '비동의', value: false }], onFilter: (value: any, record: any): boolean => value ? record.marketing : !record.marketing, render: (value: boolean): JSX.Element => value === true ? (<MarketingBlock><IoCheckbox /></MarketingBlock>) : (<MarketingBlock><IoSquareOutline /></MarketingBlock>), width: '11%' }
      ]} dataSource={users ? users : []} loading={isLoading} showSorterTooltip={false} size='middle' />
    </TableCard>
  );
}