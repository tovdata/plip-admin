import styled from 'styled-components';

const StyledDescription = styled.div`
  user-select: none;
  .label {
    color: #8C8C8C;
    display: block;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 2px;
  }
  .content {
    color: #003a8c;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
  }
`;

interface DescriptionProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  mb?: number;
}

export const Description: React.FC<DescriptionProps> = ({ children, label, mb }): JSX.Element => {
  return (
    <StyledDescription>
      <label className='label' style={{ marginBottom: mb }}>{label}</label>
      <div className='content'>{children}</div>
    </StyledDescription>
  );
}