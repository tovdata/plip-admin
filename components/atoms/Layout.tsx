import styled from 'styled-components';
// Component
import { Layout as AntLayout, Menu } from 'antd';


const AntContent = styled(AntLayout.Content)`
  margin: 24px 32px;
`;
const AntSider = styled(AntLayout.Sider)`
  background-color: #FFFFFF;
  min-height: 100vh;
  overflow-y: auto;
`;

const Layout: React.FC<any> = ({ children, selectedKey }): JSX.Element => {
  return (
    <AntLayout hasSider>
      <AntSider width={256}>
        <Menu defaultSelectedKeys={[selectedKey]} mode='inline' items={[
          { key: 'news', label: 'News' },
          { key: 'template', label: 'Template' },
          { key: 'management', label: 'Management' }
        ]} />
      </AntSider>
      <AntLayout>
        <AntContent>{children}</AntContent>
      </AntLayout>
    </AntLayout>
  );
}

export default Layout;