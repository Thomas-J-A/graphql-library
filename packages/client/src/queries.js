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
      published
      author {
        name
      }
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

export const EDIT_BIRTH_YEAR_MUTATION = gql`
  mutation EditBirthYear($name: String, $year: Int) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      born
      bookCount
    }
  }
`;
