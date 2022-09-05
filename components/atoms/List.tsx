import styled from 'styled-components';
// Component
import { List } from 'antd';

const StyledList = styled(List.Item)`
  padding-left: 24px;
  padding-right: 24px;
`;

interface AntListItemProps {
  description?: React.ReactNode;
  title?: React.ReactNode;
}

export const AntListItem: React.FC<AntListItemProps> = ({ description, title }): JSX.Element => {
  return (
    <StyledList>
      <List.Item.Meta description={description} title={title} />
    </StyledList>
  );
}