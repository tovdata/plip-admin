import styled from 'styled-components';

/** [Styled Component] 메인 메뉴 */
export const StyledMenu = styled.ul`
  position: relative;
  width: 100%;
  li.item {
    background-color: #FFFFFF;
    border: 1px solid #E7EAEC;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.24), 1px 1px 2px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    display: block;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin-bottom: 32px;
    user-select: none;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      align-item: center;
      color: #262626;
      display: flex;
      justify-content: space-between;
      padding: 24px; 32px;
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