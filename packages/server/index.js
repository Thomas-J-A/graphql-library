const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { GraphQLError } = require('graphql');
const { v4: uuidv4 } = require('uuid');

// let { authors, books } = require('./data');

// Set up config file
require('dotenv').config();

// Set up MongoDB connection
require('./configs/db.config');

const models = require('./models');

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
    author: Author
    published: Int
    genres: [String]
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => await models.Author.countDocuments({}).exec(),
    bookCount: async () => await models.Book.countDocuments({}).exec(),
    allBooks: async (_, args) => {
      let filteredBooks = await models.Book.find({})
        .populate('author', 'name')
        .exec();

      // Filter out any books with authors that don't match user's search value
      if (args.author) {
        filteredBooks = filteredBooks.filter(
          (b) => b.author.name === args.author,
        );
      }

      // Filter out any books not in genre specified in search
      if (args.genre) {
        filteredBooks = filteredBooks.filter((b) =>
          b.genres.includes(args.genre),
        );
      }

      return filteredBooks;
    },
    allAuthors: async () => await models.Author.find({}).exec(),
  },
  Mutation: {
    addBook: async (_, args, context) => {
      const authors = await models.Author.find({}).exec();
      // const isNewAuthor = !authors.some((a) => a.name === args.author);
      let author = authors.find((a) => a.name === args.author);

      // Add new author record if not already present in database
      if (!author) {
        author = new models.Author({
          name: args.author,
        });

        await author.save();
      }

      // Add new book record to database
      const newBook = new models.Book({ ...args, author: author._id });
      await newBook.save();

      return newBook;
    },
    editAuthor: async (_, args) => {
      const authorToUpdate = await models.Author.findOne({
        name: args.name,
      }).exec();

      // Throw error is author is not in database
      if (!authorToUpdate) {
        throw new GraphQLError('Author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // Update author doc
      authorToUpdate.born = args.setBornTo;
      await authorToUpdate.save();

      return authorToUpdate;
    },
  },
  Author: {
    bookCount: async (parent) => {
      const books = await models.Book.find({})
        .populate('author', 'name')
        .exec();

      return books.filter((b) => b.author.name === parent.name).length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
