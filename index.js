const path = require('path');
const express = require('express');

const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

const { products } = require('./data');

const resolvers = {
  Query: {
    hello: () => {
      return 'World';
    },
    products: () => {
      return products
    },
    product: (parent, args, context) => {
      const productId = args.id;

      const product = products.find(product => product.id === productId);
      if(!product) return null
      else return product
    },
  },
};

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers
  });


  const server = new ApolloServer({
    schema
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(4000, () => {
    console.log('Running GraphQL server...');
  });
}

startApolloServer();
