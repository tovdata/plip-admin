import styled from 'styled-components';

/** [Styled Component] 메인 페이지 헤더 */
export const StyledMainPageHeader = styled.h2`
  color: #141414;
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
  margin-bottom: 52px;
  padding-left: 40px;
  user-select: none;
`;
/** [Styled Component] 테이블 폼 헤더 */
export const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 42px;
  position: relative;
  user-select: none;
  .left {
    display: flex;
    position: relative;
    .back {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 20px;
      margin-right: 24px;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      margin: 0;
    }
  }
`;