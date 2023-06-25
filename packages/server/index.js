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
    # author: Author
    published: Int
    genres: [String]
  }
`;

const resolvers = {
  Query: {
    authorCount: async () => await models.Author.countDocuments({}).exec(),
    bookCount: async () => await models.Book.countDocuments({}).exec(),
    // allBooks: (_, args) => {
    //   let filteredBooks = books;

    //   if (args.author) {
    //     filteredBooks = filteredBooks.filter((b) => b.author === args.author);
    //   }

    //   if (args.genre) {
    //     filteredBooks = filteredBooks.filter((b) =>
    //       b.genres.includes(args.genre),
    //     );
    //   }

    //   return filteredBooks;
    // },
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
    // editAuthor: (_, args) => {
    //   let authorToUpdate = authors.find((a) => a.name === args.name);

    //   // Throw error is author not found
    //   if (!authorToUpdate) {
    //     throw new GraphQLError('Author does not exist', {
    //       extensions: {
    //         code: 'BAD_USER_INPUT',
    //         invalidArgs: args.name,
    //       },
    //     });
    //   }

    //   // Update author's born value
    //   authorToUpdate.born = args.setBornTo;

    //   return authorToUpdate;
    // },
  },
  Author: {
    // bookCount: (parent) => books.filter((b) => b.author === parent.name).length,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
