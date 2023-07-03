const { GraphQLError } = require('graphql');
const bcrypt = require('bcryptjs');
const { PubSub } = require('graphql-subscriptions');

const { generateToken } = require('./utils');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    authorCount: async (_, __, { models }) =>
      await models.Author.countDocuments({}).exec(),
    bookCount: async (_, __, { models }) =>
      await models.Book.countDocuments({}).exec(),
    allBooks: async (_, args, { models }) => {
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
    allAuthors: async (_, __, { models }) => {
      const authors = await models.Author.find({}).exec();
      const books = await models.Book.find({}).exec();

      return authors.map((a) => {
        const bookCount = books.filter((b) => b.author.equals(a._id)).length;
        return { ...a._doc, bookCount };
      });
    },
    me: (_, __, { user }) => user,
  },
  Mutation: {
    addBook: async (_, args, { user, models }) => {
      // Ensure the user is authenticated
      if (!user) {
        throw new GraphQLError('Unauthenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const authors = await models.Author.find({}).exec();
      // const isNewAuthor = !authors.some((a) => a.name === args.author);
      let author = authors.find((a) => a.name === args.author);

      // Add new author record if not already present in database
      if (!author) {
        author = new models.Author({
          name: args.author,
        });

        try {
          await author.save();
        } catch (err) {
          throw new GraphQLError('Error creating new author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              err,
            },
          });
        }
      }

      // Add new book record to database
      const newBook = new models.Book({ ...args, author: author._id });

      try {
        await newBook.save();
      } catch (err) {
        throw new GraphQLError('Error creating new book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            err,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (_, args, { user, models }) => {
      // Ensure the user is authenticated
      if (!user) {
        throw new GraphQLError('Unauthenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

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
    createUser: async (_, args, { models }) => {
      // Check if username already exists
      const existingUser = await models.User.findOne({
        username: args.username,
      }).exec();

      if (existingUser) {
        throw new GraphQLError('Username already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // Validate password length
      if (args.password.length < 8) {
        throw new GraphQLError('Password must be at least 8 characters', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const passwordHash = await bcrypt.hash(args.password, 10);

      const user = new models.User({
        username: args.username,
        password: passwordHash,
        favouriteGenre: args.favouriteGenre,
      });

      try {
        await user.save();
      } catch (err) {
        throw new GraphQLError('Error creating new user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            err,
          },
        });
      }

      return user;
    },
    logIn: async (_, args, { models }) => {
      // Verify that user exists in database
      const user = await models.User.findOne({
        username: args.username,
      }).exec();

      if (!user) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // Validate password
      const isPasswordMatch = await bcrypt.compare(
        args.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      // Create JWT token
      const token = generateToken(user);

      return { user, token };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
  Book: {
    author: async (parent, _, { models }) => {
      const author = await models.Author.findById(parent.author).exec();

      return author;
    },
  },
  // Author: {
  //   bookCount: async (parent, args, { models }) => {
  //     const books = await models.Book.find({})
  //       .populate('author', 'name')
  //       .exec();

  //     return books.filter((b) => b.author.name === parent.name).length;
  //   },
  // },
};

module.exports = resolvers;
