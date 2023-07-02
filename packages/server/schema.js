const typeDefs = `#graphql
  type Query {
    authorCount: Int
    bookCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

  type Mutation {
    addBook(title: String, author: String, published: Int, genres: [String]): Book
    editAuthor(name: String, setBornTo: Int): Author
    createUser(username: String, password: String, favouriteGenre: String): User
    logIn(username: String, password: String): AuthResponse
  }

  type Subscription {
    bookAdded: Book
  }

  type User {
    username: String
    favouriteGenre: String
    id: ID
  }

  type AuthResponse {
    user: User
    token: String
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
  }

  type Book {
    title: String
    author: Author
    published: Int
    genres: [String]
  }
`;

module.exports = typeDefs;
