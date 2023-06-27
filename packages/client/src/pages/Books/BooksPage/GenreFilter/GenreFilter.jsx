import * as S from './GenreFilter.styled';

const GenreFilter = ({ genres, selectedGenre, setSelectedGenre }) => {
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
