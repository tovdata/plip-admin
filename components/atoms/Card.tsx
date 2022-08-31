import styled from 'styled-components';
// Component
import { Card } from 'antd';

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  .subject {
    color: #8C8C8C;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
    user-select: none;
  }
  .content {
    color: #1F1F1F;
    font-size: 30px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
  }
`;
const StyledTableCard = styled(Card)`
  margin-bottom: 24px;
  .ant-card-body {
    padding: 0;
  }
  .ant-card-body .ant-table-thead > tr > th,
  .ant-card-body .ant-table-tbody > tr > td {
    padding-left: 16px;
    padding-right: 16px;
  }
  .ant-card-body .ant-table-thead > tr > th:first-child,
  .ant-card-body .ant-table-tbody > tr > td:first-child {
    padding-left: 24px;
  }
  .ant-table-pagination {
    padding-right: 20px;
  }
`;

interface CardProps {
  children?: React.ReactNode;
  loading?: boolean;
  title?: string;
}

export const AntCard: React.FC<CardProps> = ({ children, loading, title }): JSX.Element => {
  return (
    <StyledCard loading={loading} title={title}>{children}</StyledCard>
  );
}
export const SimpleCard: React.FC<CardProps> = ({ children, loading, title }): JSX.Element => {
  return (
    <StyledCard loading={loading}>
      {title ? (<label className='subject'>{title}</label>) : (<></>)}
      {children ? (<h2 className='content'>{children}</h2>) : (<></>)}
    </StyledCard>
  );
}
export const TableCard: React.FC<CardProps> = ({ children, loading, title }): JSX.Element => {
  return (
    <StyledTableCard loading={loading} title={title}>{children}</StyledTableCard>
  );
}