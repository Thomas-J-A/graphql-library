import { useQuery } from '@apollo/client';

import AuthorsTable from './AuthorsTable/AuthorsTable';

import { GET_AUTHORS_QUERY } from '../../../queries';

import * as S from './IndexPage.styled';

const IndexPage = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <S.IndexPage>
      <S.Title>Authors</S.Title>
      <AuthorsTable authors={data.allAuthors} />
    </S.IndexPage>
  );
};

export default IndexPage;
