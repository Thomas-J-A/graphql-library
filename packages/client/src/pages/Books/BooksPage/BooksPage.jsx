import { useState } from 'react';
import { useQuery } from '@apollo/client';

import BooksTable from '../../../components/BooksTable/BooksTable';
import GenreFilter from './GenreFilter/GenreFilter';

import { GET_BOOKS_QUERY } from '../../../queries';

import * as S from './BooksPage.styled';

const BooksPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY, {
    variables: { genre: selectedGenre },
    // fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  return (
    <S.BooksPage>
      <S.Title>Books</S.Title>
      <GenreFilter
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <BooksTable books={data.allBooks} />
    </S.BooksPage>
  );
};

export default BooksPage;
