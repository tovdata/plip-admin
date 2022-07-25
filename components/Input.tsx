// Component
import { StyledInputGroup } from '@/components/styles/Input';

/** [Component] 입력 그룹 */
export const InputGroup: React.FC<any> = ({ children, label }): JSX.Element => {
  return (
    <StyledInputGroup>
      <p className='label'>{label}</p>
      <>{children}</>
    </StyledInputGroup>
  );
}