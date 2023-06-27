import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import AuthorsTable from './AuthorsTable/AuthorsTable';
import UpdateBirthYearForm from './UpdateBirthYearForm/UpdateBirthYearForm';

import { AuthContext } from '../../../contexts/AuthContext';

import { GET_AUTHORS_QUERY } from '../../../queries';

import * as S from './IndexPage.styled';

const IndexPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <S.IndexPage>
      <S.Title>Authors</S.Title>
      <AuthorsTable authors={data.allAuthors} />
      {currentUser && (
        <>
          <S.Subtitle>Set Birthyear</S.Subtitle>
          <UpdateBirthYearForm authors={data.allAuthors} />
        </>
      )}
    </S.IndexPage>
  );
};

export default IndexPage;
