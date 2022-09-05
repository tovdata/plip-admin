import dynamic from 'next/dynamic';
import styled from 'styled-components';
// Component
import { Layout as AntLayout, Menu } from 'antd';
import Link from 'next/link';
// Icon
const AiOutlineFileText = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineFileText));
const AiOutlineHome = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineHome));
const AiOutlineInbox = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineInbox));

const StyledContent = styled(AntLayout.Content)`
  margin: 24px 32px;
`;
const StyledSider = styled(AntLayout.Sider)`
  background-color: #FFFFFF;
  min-height: 100vh;
  overflow-y: auto;
`;

interface LayoutProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  selectedKey: string;
}

const Layout: React.FC<LayoutProps> = ({ children, selectedKey }): JSX.Element => {
  return (
    <AntLayout hasSider>
      <StyledSider width={256}>
        <Menu defaultSelectedKeys={[selectedKey]} mode='inline' items={[
          { icon: (<AiOutlineHome/>), key: 'management', label: (<Link passHref href='/'><a>Management</a></Link>) },
          { icon: (<AiOutlineInbox />), key: 'news', label: (<Link passHref href='/news'><a>News</a></Link>) },
          { icon: (<AiOutlineFileText/>), key: 'document', label: (<Link passHref href='/document'><a>Document</a></Link>) }
        ]} />
      </StyledSider>
      <AntLayout>
        <StyledContent>{children}</StyledContent>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;