const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { typeDefs, resolvers } = require('./schemas');
const authMiddleware = require('./auth');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(authMiddleware);

server.start().then(() => {
  app.use(
    '/graphql',
    expressMiddleware(server) 
  );

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/graphql`);
    });
  });
});
