import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import LogOutButton from './LogOutButton/LogOutButton';

import * as S from './MainNav.styled';

const MainNav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <S.MainNav>
      <S.NavList>
        <S.NavItem>
          <Link to={`/`}>Authors</Link>
        </S.NavItem>
        <S.NavItem>
          <Link to={`/books`}>Books</Link>
        </S.NavItem>
        {currentUser ? (
          <>
            <S.NavItem>
              <Link to={`/add-book`}>Add Book</Link>
            </S.NavItem>
            <S.NavItem>
              <Link to={`/recommendations`}>Recommendations</Link>
            </S.NavItem>
            <S.NavItem>
              <LogOutButton />
            </S.NavItem>
          </>
        ) : (
          <S.NavItem>
            <Link to={`/login`}>Log In</Link>
          </S.NavItem>
        )}
      </S.NavList>
    </S.MainNav>
  );
};

export default MainNav;
