import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from '@graphql-tools/load';
import { ApolloServer } from 'apollo-server-express';
import { join } from 'path';

import express from 'express';

import resolvers from '@resolver/index';
import dateScalar from '@scalar/date';

export const createApp = async (): Promise<express.Application> => {
  const app = express();

  const schemaPath = join(__dirname, './graphql/schemas/index.graphql');

  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
  });

  const resolversWithScalars = {
    Date: dateScalar,
    ...resolvers
  };

  const schemaWithResolvers = addResolversToSchema({
    resolvers: resolversWithScalars,
    schema
  });

  const server = new ApolloServer({
    schema: schemaWithResolvers
  });

  await server.start();

  server.applyMiddleware({ app });

  return app;
};
