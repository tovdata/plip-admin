import dynamic from 'next/dynamic';
// Component
import { StyledPageHeader, StyledTableFormHeader } from '@/components/styles/Header';
// Icon
const VscChevronLeft = dynamic(() => import('react-icons/vsc').then((mod: any): any => mod.VscChevronLeft));

/** [Component] 테이블 폼 헤더 */
export const TableFormHeader: React.FC<any> = ({ title, tools }): JSX.Element => {
  return (
    <StyledTableFormHeader>
      <h3 className='title'>{title}</h3>
      <>{tools}</>
    </StyledTableFormHeader>
  );
}
/** [Component] 페이지 헤더 */
export const PageHeader: React.FC<any> = ({ isBack, redirectPath, onEvent, title, style }): JSX.Element => {
  return (
    <StyledPageHeader style={style}>
      {isBack ? onEvent ? (
        <span className='back' onClick={onEvent}>
          <VscChevronLeft />
        </span>
      ) : (
        <a className='back' href={redirectPath ? redirectPath : '/'}>
          <VscChevronLeft />
        </a>
      ) : (<></>)}
      <h2 className='title'>{title}</h2>
    </StyledPageHeader>
  );
}