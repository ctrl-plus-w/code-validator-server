import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { ApolloServer } from 'apollo-server-express';
import { loadSchemaSync } from '@graphql-tools/load';
import { join } from 'path';

import express from 'express';

import dateScalar from '@scalar/date';

export const createApp = async (): Promise<express.Application> => {
  const app = express();

  const schemaPath = join(__dirname, './graphql/schemas/index.graphql');

  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
  });

  const resolvers = {
    Date: dateScalar
  };

  const server = new ApolloServer({
    resolvers,
    schema
  });

  await server.start();

  return app;
};
