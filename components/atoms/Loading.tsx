import styled from 'styled-components';
// Component
import { Spin } from 'antd';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const PageLoading: React.FC<any> = (): JSX.Element => {
  return (
    <StyledContainer>
      <Spin size='large' />
    </StyledContainer>
  );
}