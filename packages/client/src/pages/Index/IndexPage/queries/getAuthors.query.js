import { gql } from '@apollo/client';

export const GET_AUTHORS_QUERY = gql`
  query GetAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
