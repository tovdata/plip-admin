import styled from 'styled-components';

const StyledLabelGroup = styled.div<{ flex: boolean | undefined }>`
  flex: ${({ flex }) => flex ? 1 : undefined};
  margin-bottom: 16px;
  .label {
    color: #8c8c8c;
    display: block;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 2px;
  }
`;

interface LabelGroupProps {
  children?: React.ReactNode;
  flex?: boolean;
  label: string;
}

export const LabelGroup: React.FC<LabelGroupProps> = ({ children, flex, label }): JSX.Element => {
  return (
    <StyledLabelGroup flex={flex}>
      <label className='label'>{label}</label>
      <div className='content'>{children}</div>
    </StyledLabelGroup>
  );
}