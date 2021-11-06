import express from 'express';

export const createApp = async (): Promise<express.Application> => {
  const app = express();

  // const server = new ApolloServer({});
  // await server.start();

  return app;
};
