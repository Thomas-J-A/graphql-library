import { gql } from '@apollo/client';

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    allBooks {
      title
      author
      published
    }
  }
`;
