import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';

import MainNav from './components/MainNav/MainNav';
import Notification from './components/UI/Notification/Notification';

import * as S from './App.styled';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  return (
    <S.App>
      <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
        <NotificationContext.Provider
          value={{ notificationMsg, setNotificationMsg }}
        >
          <MainNav />
          {notificationMsg && <Notification msg={notificationMsg} />}
          <Outlet />
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </S.App>
  );
};

export default App;
