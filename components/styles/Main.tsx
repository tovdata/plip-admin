import styled from 'styled-components';

/** [Styled Component] 메인 메뉴 */
export const StyledMenu = styled.ul`
  position: relative;
  width: 100%;
  li.item {
    background-color: #F0F6FF;
    border-radius: 8px;
    color: #0050B3;
    cursor: pointer;
    display: block;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 32px;
    padding: 24px; 32px;
    user-select: none;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      align-item: center;
      color: #0050B3;
      display: flex;
      justify-content: space-between;
      text-decoration: none;
      .label {
        cursor: pointer;
        margin: 0;
      }
      .icon {
        align-items: center;
        cursor: pointer;
        display: flex;
        margin: 0;
      }
    }
  }
`;