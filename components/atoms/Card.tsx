import styled from 'styled-components';
// Component
import { Card } from 'antd';

const StyledSmallCard = styled(Card)`
  margin-bottom: 16px;
  .ant-card-body {
    padding: 18px 24px;
  }
  .card-content {
    color: #1f1f1f;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }
  .card-content .right {
    display: flex;
    justify-content: flex-end;
  }
  .card-subject {
    color: #8c8c8c;
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 6px;
    margin-top: 0;
    user-select: none;
  }
`;
const StyledCard = styled(Card)`
  margin-bottom: 16px;
  .card-content {
    color: #1f1f1f;
    font-size: 24px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }
  .card-content .right {
    display: flex;
    justify-content: flex-end;
  }
  .card-subject {
    color: #8c8c8c;
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 6px;
    margin-top: 0;
    user-select: none;
  }
`;
const StyledUploadCard = styled(Card)`
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
  margin-bottom: 16px;
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
  right?: boolean;
  small?: boolean;
  title?: string;
}
interface CardElementsProps {
  children?: React.ReactNode;
  right?: boolean;
  title?: string;
}

export const AntCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledCard extra={extra} loading={loading} title={title}>{children}</StyledCard>
  );
}
export const ItemCard: React.FC<CardProps> = ({ children, extra, loading, right, small, title }): JSX.Element => {
  return (
    <>
      {small ? (
        <StyledSmallCard extra={extra} loading={loading}>
          {children ? (
            <ItemCardElements right={right} title={title}>{children}</ItemCardElements>
          ) : (<></>)}
        </StyledSmallCard>
      ) : (
        <StyledCard>
          {children ? (
            <ItemCardElements right={right} title={title}>{children}</ItemCardElements>
          ) : (<></>)}
        </StyledCard>
      )}
    </>
  );
}
export const TableCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledTableCard extra={extra} loading={loading} title={title}>{children}</StyledTableCard>
  );
}
export const UploadCard: React.FC<CardProps> = ({ children, extra, loading, title }): JSX.Element => {
  return (
    <StyledUploadCard extra={extra} loading={loading} title={title}>{children}</StyledUploadCard>
  )
}

const ItemCardElements: React.FC<CardElementsProps> = ({ children, right, title }): JSX.Element => {
  return (
    <>
      {title ? (
        <label className='card-subject'>{title}</label>
      ) : (<></>)}
      {children ? (
        <div className='card-content'>
          {right ? (
            <div className='right'>{children}</div>
          ) : (<>{children}</>)}
        </div>
      ) : (<></>)}
    </>
  );
}