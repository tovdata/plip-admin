import dynamic from 'next/dynamic';
// Component
import { StyledPageHeader } from '@/components/styles/Header';
// Icon
const VscChevronLeft = dynamic(() => import('react-icons/vsc').then((mod: any): any => mod.VscChevronLeft));

/** [Component] 페이지 헤더 */
export const PageHeader: React.FC<any> = ({ isBack, redirectPath, onEvent, title, tools, style }): JSX.Element => {
  return (
    <StyledPageHeader style={style}>
      <div className='left'>
        {isBack ? onEvent ? (
          <span className='back' onClick={onEvent}>
            <VscChevronLeft />
          </span>
        ) : (
          <a className='back' href={redirectPath ? redirectPath : '/'}>
            <VscChevronLeft />
          </a>
        ) : (<></>)}
        <h3 className='title'>{title}</h3>
      </div>
      <div className='right'>{tools}</div>
    </StyledPageHeader>
  );
}