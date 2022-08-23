import styled from 'styled-components';

/** [Styled Component] 뉴스 기사 정보 */
export const StyledDetail = styled.div`
  position: relative;
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-form-item-explain-error {
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    margin-top: 6px;
    user-select: none;
  }
  .ant-picker {
    width: 100%;
  }
  .ant-upload-drag-container {
    display: flex !important;
    justify-content: center;
    padding: 6px 12px;
  }
  .ant-upload-drag-icon {
    align-items: center;
    color: #597EF7;
    display: flex;
    font-size: 22px;
    justify-content: center;
    line-height: 52px;
    margin-right: 12px;
    margin-bottom: 0 !important;
  }
  .ant-upload-list-item {
    font-size: 13px;
    margin-top: 14px;
  }
  .ant-upload-text {
    align-items: center;
    color: #030852 !important;
    display: flex;
    font-size: 14px !important;
    font-weight: 400;
    justify-content: center;
    margin-bottom: 0 !important;
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