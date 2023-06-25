const mongoose = require('mongoose');

const env = require('./env.config');

console.log(`Connecting to ${env.MONGODB_URI}`);

mongoose
  .connect(env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((err) => `Error connecting to MongoDB: ${err}`);
