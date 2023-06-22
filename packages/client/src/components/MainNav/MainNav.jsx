import { Link } from 'react-router-dom';

import * as S from './MainNav.styled';

const MainNav = () => {
  return (
    <S.MainNav>
      <S.NavList>
        <S.NavItem>
          <Link to={`/`}>Authors</Link>
        </S.NavItem>
        <S.NavItem>
          <Link to={`/books`}>Books</Link>
        </S.NavItem>
      </S.NavList>
    </S.MainNav>
  );
};

export default MainNav;
