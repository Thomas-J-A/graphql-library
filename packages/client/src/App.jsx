import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { NotificationContext } from './contexts/NotificationContext.js';

import MainNav from './components/MainNav/MainNav';
import Notification from './components/UI/Notification/Notification';

import * as S from './App.styled';

const App = () => {
  const [notificationMsg, setNotificationMsg] = useState('');

  return (
    <S.App>
      <NotificationContext.Provider
        value={{ notificationMsg, setNotificationMsg }}
      >
        <MainNav />
        {notificationMsg && <Notification msg={notificationMsg} />}
        <Outlet />
      </NotificationContext.Provider>
    </S.App>
  );
};

export default App;
