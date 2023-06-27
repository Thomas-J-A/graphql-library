import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import { AuthContext } from '../../../contexts/AuthContext';

const LogOutButton = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    client.resetStore();
    navigate('/login');
  };

  return (
    <button type="button" onClick={handleLogOut}>
      Log Out
    </button>
  );
};

export default LogOutButton;
