import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useSubscription } from '@apollo/client';

import { AuthContext } from './contexts/AuthContext';
import { NotificationContext } from './contexts/NotificationContext';

import MainNav from './components/MainNav/MainNav';
import Notification from './components/UI/Notification/Notification';

import { BOOK_ADDED_SUBSCRIPTION, GET_BOOKS_QUERY } from './queries';

import * as S from './App.styled';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState('');

  useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onData: ({ data, client }) => {
      const { bookAdded } = data.data;

      // Show user a temporary notification
      setNotificationMsg(
        `New book added: ${bookAdded.title} by ${bookAdded.author.name}`,
      );
      setTimeout(() => setNotificationMsg(''), 5000);

      // Update cache field used by books list
      client.cache.updateQuery(
        { query: GET_BOOKS_QUERY, variables: { genre: '' } },
        ({ allBooks }) => ({
          allBooks: [...allBooks, bookAdded],
        }),
      );

      // Update cache field used by genre list
      client.cache.updateQuery({ query: GET_BOOKS_QUERY }, ({ allBooks }) => ({
        allBooks: [...allBooks, bookAdded],
      }));
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
