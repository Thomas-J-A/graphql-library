import { gql } from '@apollo/client';

export const GET_AUTHORS_QUERY = gql`
  query GET_AUTHORS {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
