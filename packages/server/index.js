const { ApolloServer } = require('@apollo/server');
// const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('./models');

// Set up config file
require('dotenv').config();

// Set up MongoDB connection
require('./configs/db.config');

const context = async ({ req }) => {
  let user = null;

  // Get reference to authorization header value
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Filter out jwt token from 'Bearer' prefix
    const token = authHeader.substring(7);

    // Verify token, then query database for entire user document
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    user = await models.User.findById(payload.sub).exec();
  }

  return { user, models };
};

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer(
    { schema, context: () => ({ models }) },
    wsServer,
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use('/', cors(), express.json(), expressMiddleware(server, { context }));

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}`),
  );
};

start();
