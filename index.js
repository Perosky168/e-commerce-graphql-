const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

const { products, categories, reviews } = require('./data');

const { Query } = require('./resolvers/Query')
const { Product } = require('./resolvers/Product')
const { Category } = require('./resolvers/Category')

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: {
      Query,
      Category,
      Product,
    },
  });

  const server = new ApolloServer({
    schema, context: {
      categories,
      products,
      reviews,
    }
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Running GraphQL server...');
  });
}

startApolloServer();
