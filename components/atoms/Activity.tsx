import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
// Component
import { TableCard } from '@/components/atoms/Card';
import { AntListItem } from '@/components/atoms/List';
import { List } from 'antd';
// Query
import { getActivities } from '@/models/apis/service';
// Query key
import { KEY_ACTICITIES } from '@/models/type';
// Util
import { transformToDatetime } from 'utils/util';
import { PageHeader } from './Header';

const Activity: React.FC<any> = ({ onBack, serviceId }): JSX.Element => {
  const { isLoading, data } = useQuery([KEY_ACTICITIES, serviceId], async () => await getActivities(serviceId));
  // 아이템 표현 함수
  const renderItem = useCallback((item: any): JSX.Element => (
    <AntListItem description={item.message} title={transformToDatetime(item.timestamp)} />
  ), []);
  
  // 결과 반환
  return (
    <>
      <PageHeader ghost onBack={onBack} title='활동 내역' />
      <TableCard loading={isLoading} title='서비스 사용 내역'>
        <List dataSource={data} itemLayout='horizontal' renderItem={renderItem} />
      </TableCard>
    </>
  );
}

export default Activity;