import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { loadSchemaSync } from '@graphql-tools/load';
import { ApolloServer } from 'apollo-server-express';
import { join } from 'path';

import type { Request } from 'express';

import express from 'express';

import resolvers from '@resolver/index';
import dateScalar from '@scalar/date';

import User from '@model/User';

import { Context, TokenPayload } from '@/types/graphql';

import CONFIG from '@/config';

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

  const context = async ({ req }: { req: Request }): Promise<Context> => {
    try {
      const [, token] = req.headers.authorization?.split(' ') || [];

      const decodedToken: TokenPayload = <TokenPayload>(
        verify(token, CONFIG.AUTH.TOKEN_SALT)
      );

      const user = await User.findByPk(decodedToken.id);
      if (!user) throw new Error();

      return {
        jwt: decodedToken,
        loggedIn: true,
        user: user,
        expired: false
      };
    } catch (err: unknown) {
      return {
        loggedIn: false,
        jwt: null,
        user: null,
        expired: err instanceof TokenExpiredError
      };
    }
  };

  const server = new ApolloServer({
    context: context,
    schema: schemaWithResolvers
  });

  await server.start();

  server.applyMiddleware({ app });

  return app;
};
