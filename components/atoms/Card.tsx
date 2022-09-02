import styled from 'styled-components';
// Component
import { Card } from 'antd';

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  .card-subject {
    color: #8C8C8C;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
    user-select: none;
  }
  .card-content {
    color: #1F1F1F;
    font-size: 24px;
    font-weight: 400;
    line-height: 1.4;
    margin: 0;
  }
  .ant-card-body .ant-form-item {
    margin-bottom: 0;
  }
  .ant-card-body .ant-form-item-explain-error {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    margin-top: 6px;
    user-select: none;
  }
  .ant-card-body .ant-picker {
    width: 100%;
  }
  .ant-card-body .ant-upload-drag-container {
    display: flex !important;
    justify-content: center;
    padding: 6px 12px;
  }
  .ant-card-body .ant-upload-drag-icon {
    align-items: center;
    color: #597EF7;
    display: flex;
    font-size: 22px;
    justify-content: center;
    line-height: 52px;
    margin-right: 12px;
    margin-bottom: 0 !important;
  }
  .ant-card-body .ant-upload-list-item {
    font-size: 13px;
    margin-top: 14px;
  }
  .ant-card-body .ant-upload-text {
    align-items: center;
    color: #030852 !important;
    display: flex;
    font-size: 14px !important;
    font-weight: 400;
    justify-content: center;
    margin-bottom: 0 !important;
  }
  .ant-card-body .footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    button {
      margin-left: 16px;
    }
    button:first-child {
      margin-left: 0;
    }
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
  .ant-card-body .ant-skeleton {
    padding: 24px;
  }
  .ant-card-body .ant-skeleton .ant-skeleton-paragraph {
    margin-bottom: 0;
  }
  .ant-table-pagination {
    padding-right: 20px;
  }
`;

interface CardProps {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  loading?: boolean;
  title?: string;
}

export const AntCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledCard extra={extra} loading={loading} title={title}>{children}</StyledCard>
  );
}
export const SimpleCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledCard extra={extra} loading={loading}>
      {title ? (<label className='card-subject'>{title}</label>) : (<></>)}
      {children ? (<h2 className='card-content'>{children}</h2>) : (<></>)}
    </StyledCard>
  );
}
export const TableCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledTableCard extra={extra} loading={loading} title={title}>{children}</StyledTableCard>
  );
}