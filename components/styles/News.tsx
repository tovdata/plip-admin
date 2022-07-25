import styled from 'styled-components';

/** [Styled Component] 뉴스 기사 정보 */
export const StyledNewsDetail = styled.div`
  position: relative;
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-picker {
    width: 100%;
  }
  .footer {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 48px;
    button {
      margin-left: 16px;
    }
    button:first-child {
      margin-left: 0;
    }
  }
`;