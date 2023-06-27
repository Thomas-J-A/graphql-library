import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import { GET_BOOKS_QUERY } from '../../../queries';

import { AuthContext } from '../../../contexts/AuthContext';

import BooksTable from '../../../components/BooksTable/BooksTable';

import * as S from './RecommendationsPage.styled';

const RecommendationsPage = () => {
  const {
    currentUser: { favouriteGenre },
  } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error!</p>;

  // Filter books list so only books matching the
  // logged-in user's favourite genre are shown
  const filteredList = data.allBooks.filter((b) =>
    b.genres.includes(favouriteGenre),
  );

  return (
    <S.RecommendationsPage>
      <S.Title>Recommendations</S.Title>
      <p>{`Based on your favourite genre ${favouriteGenre}`}</p>
      <BooksTable books={filteredList} />
    </S.RecommendationsPage>
  );
};

export default RecommendationsPage;
