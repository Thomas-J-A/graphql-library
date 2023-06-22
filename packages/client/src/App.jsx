import { Outlet } from 'react-router-dom';

import MainNav from './components/MainNav/MainNav';

import * as S from './App.styled';

const App = () => {
  return (
    <S.App>
      <MainNav />
      <Outlet />
    </S.App>
  );
};

export default App;
