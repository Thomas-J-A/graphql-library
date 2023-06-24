import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import { NotificationContext } from '../../../../contexts/NotificationContext';

import {
  EDIT_BIRTH_YEAR_MUTATION,
  GET_AUTHORS_QUERY,
} from '../../../../queries';

const UpdateBirthYearForm = ({ authors }) => {
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

  const options = [
    { value: '', label: '-- Choose an option --', disabled: true },
    ...authors.map((a) => ({ value: a.name, label: a.name })),
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {options.map((o, i) => (
              <option key={i} value={o.value} disabled={o.disabled}>
                {o.label}
              </option>
            ))}
          </select>
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
