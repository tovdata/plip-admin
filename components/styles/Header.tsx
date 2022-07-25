import styled from 'styled-components';

/** [Styled Companent] 대시보드 */
export const StyledPageHeader = styled.div`
  align-item: center;
  color: #000000D9;
  display: flex;
  margin-bottom: 52px;
  position: relative;
  user-select: none;
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
`;
/** [Styled Component] 테이블 폼 헤더 */
export const StyledTableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  position: relative;
  user-select: none;
  width: 100%;
  .title {
    color: #000000D9;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
  }
`;