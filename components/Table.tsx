// Component
import { Table } from 'antd';

/** [Component] 기본 테이블 */
export const BasicTable: React.FC<any> = ({ columns, dataSource, loading, onSelect }): JSX.Element => {
  return (
    <Table columns={columns} dataSource={dataSource} loading={loading} onRow={(record: any) => ({ onClick: (): void => onSelect(record) })} showSorterTooltip={false} />
  );
}