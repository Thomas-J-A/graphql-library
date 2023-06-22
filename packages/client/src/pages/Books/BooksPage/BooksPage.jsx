import { useQuery } from '@apollo/client';

import BooksTable from './BooksTable/BooksTable';

import { GET_BOOKS_QUERY } from '../../../queries';

import * as S from './BooksPage.styled';

const BooksPage = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <S.BooksPage>
      <S.Title>Books</S.Title>
      <BooksTable books={data.allBooks} />
    </S.BooksPage>
  );
};

export default BooksPage;
