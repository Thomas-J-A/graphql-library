import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { AuthContext } from '../../../../contexts/AuthContext';

import { LOG_IN_MUTATION } from '../../../../queries';

const LogInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [logIn] = useMutation(LOG_IN_MUTATION, {
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.logIn.token);

      setCurrentUser(data.logIn.user);

      navigate('/books');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    logIn({ variables: { username, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogInForm;
