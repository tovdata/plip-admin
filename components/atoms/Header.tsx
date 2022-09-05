import styled from 'styled-components';
// Component
import { PageHeader as AntPageHeader } from 'antd';

const StyledHeader = styled(AntPageHeader)`
  padding-bottom: 24px;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  .ant-page-header-heading {
    margin-top: 4px;
  }
`;

export interface PageHeaderProps {
  backIcon?: React.ReactNode;
  breadcrumb?: any;
  breadcrumbRender?: (props: PageHeaderProps, defaultDom: React.ReactNode) => React.ReactNode;
  children?: React.ReactNode;
  extra?: React.ReactNode;
  ghost?: boolean;
  onBack?: (e?: React.MouseEvent<HTMLDivElement>) => void;
  title?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ backIcon, breadcrumb, breadcrumbRender, children, extra, ghost, onBack, title }): JSX.Element => {
  return (
    <StyledHeader backIcon={backIcon} breadcrumb={breadcrumb} breadcrumbRender={breadcrumbRender} extra={extra} ghost={ghost} onBack={onBack} title={title}>{children}</StyledHeader>
  );
}