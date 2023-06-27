import { useState } from 'react';
import { useQuery } from '@apollo/client';

import BooksTable from './BooksTable/BooksTable';
import GenreFilter from './GenreFilter/GenreFilter';

import { GET_BOOKS_QUERY } from '../../../queries';

import * as S from './BooksPage.styled';

const BooksPage = () => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  const filteredList = selectedGenre
    ? data.allBooks.filter((b) => b.genres.includes(selectedGenre))
    : data.allBooks;

  // Create a list of unique genres to pass to filter component
  const genres = data.allBooks.reduce((prev, curr) => {
    curr.genres.forEach((genre) => {
      if (!prev.includes(genre)) {
        prev.push(genre);
      }
    });

    return prev;
  }, []);

  return (
    <S.BooksPage>
      <S.Title>Books</S.Title>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />
      <BooksTable books={filteredList} />
    </S.BooksPage>
  );
};

export default BooksPage;
