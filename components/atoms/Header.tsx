import dynamic from 'next/dynamic';
import styled from 'styled-components';
// Icon
const VscChevronLeft = dynamic(() => import('react-icons/vsc').then((mod: any): any => mod.VscChevronLeft));

/** [Styled Component] 테이블 폼 헤더 */
const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
  padding-top: 24px;
  position: relative;
  user-select: none;
  .left {
    display: flex;
    position: relative;
    .back {
      align-items: center;
      color: #262626;
      cursor: pointer;
      display: flex;
      font-size: 20px;
      margin-right: 16px;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      margin: 0;
    }
  }
`;

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