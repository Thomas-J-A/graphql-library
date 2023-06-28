import { useQuery } from '@apollo/client';

import { GET_BOOKS_QUERY } from '../../../../queries';

import * as S from './GenreFilter.styled';

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  // Create a list of unique genres to pass to filter component
  const genres = data.allBooks.reduce((prev, curr) => {
    curr.genres.forEach((genre) => {
      if (!prev.includes(genre)) {
        prev.push(genre);
      }
    });

    return prev;
  }, []);

  // Create a button for each genre
  const genreButtons = [
    ...genres.map((g) => (
      <S.Button key={g} type="button" onClick={() => setSelectedGenre(g)}>
        {g}
      </S.Button>
    )),
    <S.Button key="all" type="button" onClick={() => setSelectedGenre('')}>
      All
    </S.Button>,
  ];

  return (
    <S.GenreFilter>
      <S.Title>Filter By Genre</S.Title>
      <S.Subtitle>{selectedGenre ? selectedGenre : 'All'}</S.Subtitle>
      {genreButtons}
    </S.GenreFilter>
  );
};

export default GenreFilter;
