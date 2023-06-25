const jwt = require('jsonwebtoken');

module.exports = (user) => {
  return jwt.sign({ sub: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 60 * 15,
  });
};
