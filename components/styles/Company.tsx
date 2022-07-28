import styled from 'styled-components';

/** [Styled Companent] 대시보드 */
export const StyledDashboard = styled.div`
  background-color: #F0F5FF;
  min-height: 100vh;
`;
/** [Styled Companent] 대시보드 카드 */
export const StyledDashboardCard = styled.div`
  background-color: #FFFFFF;
  border: 1.5px solid #F0F5FF;
  border-radius: 16px;
  height: 100%;
  padding: 24px 32px;
  .title {
    color: #061178;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    margin-bottom: 16px;
    user-select: none;
  }
`;
/** [Styled Component] 책임자 */
export const StyledManager = styled.div`
  margin: 16px 10px;
  position: relative;
  user-select: none;
  width: 100%;
  .header {
    color: #2F2E41;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-bottom: 20px;
    .icon {
      margin-left: 6px;
    }
  }
  .description {
    align-item: center;
    display: flex;
    position: relative;
    .item {
      color: #3F3D56;
      margin-right: 86px;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      .label {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        margin-right: 24px;
      }
      .text {
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
      }
    }
  }
`;
/** [Styled Component] 서비스 */
export const StyledService = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  .name {
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
  }
  .date {
    color: #2F2E41;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
`;
/** [Styled Component] 서비스 목록 */
export const StyledServiceList = styled.div`
  max-height: 246px;
  overflow-y: auto;
  position: relative;
  user-select: none;
`;
/** [Styled Component] 사용자 목록 */
export const StyledUserList = styled.div`
  color: #11142D;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  max-height: 246px;
  overflow-y: auto;
  position: relative;
  user-select: none;
  text-align: center;
`;
/** [Styled Component] 사용자 목록 */
export const StyledUserListHeader = styled.div`
  color: #11142D;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 10px;
  position: relative;
  user-select: none;
  text-align: center;
`;