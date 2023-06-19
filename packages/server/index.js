const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { v4: uuidv4 } = require('uuid');

let { authors, books } = require('./data');

const typeDefs = `#graphql
  type Query {
    authorCount: Int
    bookCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
  }

  type Mutation {
    addBook(title: String, author: String, published: Int, genres: [String]): Book
    editAuthor(name: String, setBornTo: Int): Author
  }

  type Author {
    name: String
    born: Int
    bookCount: Int
  }

  type Book {
    title: String
    author: String
    published: Int
    genres: [String]
  }
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (_, args) => {
      let filteredBooks = books;

      if (args.author) {
        filteredBooks = filteredBooks.filter((b) => b.author === args.author);
      }

      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre),
        );
      }

      return filteredBooks;
    },
    allAuthors: () => authors,
  },
  Mutation: {
    addBook: (_, args) => {
      // Add new author record if not already present in dataset
      const isNewAuthor = !books.some((b) => b.author === args.author);
      if (isNewAuthor) {
        const newAuthor = { name: args.author, id: uuidv4() };
        authors = [...authors, newAuthor];
      }

      // Add new book record to dataset
      const newBook = { ...args, id: uuidv4() };
      books = [...books, newBook];

      return newBook;
    },
    editAuthor: (_, args) => {
      let authorToUpdate = authors.find((a) => a.name === args.name);

      // Throw error is author not found
      if (!authorToUpdate) {
        throw new GraphQLError('Author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }

      // Update author's born value
      authorToUpdate.born = args.setBornTo;

      return authorToUpdate;
    },
  },
  Author: {
    bookCount: (parent) => books.filter((b) => b.author === parent.name).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
