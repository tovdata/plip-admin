import dynamic from 'next/dynamic';
// Component
import { StyledMainPageHeader } from '@/components/styles/Header';
import { StyledMenu } from '@/components/styles/Main';
// Icon
const AiOutlineRight = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineRight));

/** [Component] 메인 메뉴 */
const MainMenu: React.FC<any> = (): JSX.Element => {
  // 컴포넌트 반환
  return (
    <>
      <StyledMainPageHeader>Management Menu</StyledMainPageHeader>
      <StyledMenu>
        <MainMenuItem label='뉴스 게시판 관리' link='/news' />
        <MainMenuItem label='템플릿 메뉴 관리' link='/template' />
        <MainMenuItem label='가입된 회사 관리' link='/company' />
      </StyledMenu>
    </>
  )
}

/** [Internal Component] 메인 메뉴 아이템 */
const MainMenuItem: React.FC<any> = ({ label, link }): JSX.Element => {
  return (
    <li className='item'>
      <a href={link}>
        <label className='label'>{label}</label>
        <span className='icon'>
          <AiOutlineRight />
        </span>
      </a>
    </li>
  );
}

export default MainMenu;