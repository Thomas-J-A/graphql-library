const authorModel = require('./author.model');
const bookModel = require('./book.model');
const userModel = require('./user.model');

module.exports = {
  Author: authorModel,
  Book: bookModel,
  User: userModel,
};
