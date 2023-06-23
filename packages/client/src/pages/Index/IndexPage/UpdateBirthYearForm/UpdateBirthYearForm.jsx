import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import { NotificationContext } from '../../../../contexts/NotificationContext';

import {
  EDIT_BIRTH_YEAR_MUTATION,
  GET_AUTHORS_QUERY,
} from '../../../../queries';

const UpdateBirthYearForm = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const { setNotificationMsg } = useContext(NotificationContext);
  const [editBirthYear] = useMutation(EDIT_BIRTH_YEAR_MUTATION, {
    refetchQueries: [{ query: GET_AUTHORS_QUERY }],
    onError: (error) => {
      const message = error.graphQLErrors[0].message;
      setNotificationMsg(message);
      setTimeout(() => setNotificationMsg(''), 5000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editBirthYear({ variables: { name, year: Number(year) } });

    setName('');
    setYear('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Born:
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </label>
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateBirthYearForm;
