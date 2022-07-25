import styled from 'styled-components';

/** [Styled Component] 입력 그룹 */
export const StyledInputGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  .label {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 8px;
  }
  .input {
    width: 100%;
  }
`;