import { gql } from '@apollo/client';

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
    }
    genres
  }
`;

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
  query GetBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

export const LOG_IN_MUTATION = gql`
  mutation LogIn($username: String, $password: String) {
    logIn(username: $username, password: $password) {
      user {
        username
        favouriteGenre
      }
      token
    }
  }
`;

export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
