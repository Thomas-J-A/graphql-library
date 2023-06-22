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

export const GET_BOOKS_QUERY = gql`
  query GetBooks {
    allBooks {
      title
      author
      published
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation AddBook(
    $title: String
    $author: String
    $published: Int
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`;
