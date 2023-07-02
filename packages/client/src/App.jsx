import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSubscription } from '@apollo/client';

import { AuthContext } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';

import MainNav from './components/MainNav/MainNav';
import Notification from './components/UI/Notification/Notification';

import { BOOK_ADDED_SUBSCRIPTION } from './queries';

import * as S from './App.styled';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log(data);
      alert('Data received!');
    },
  });

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
