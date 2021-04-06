import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { config } from './config';
import { redis } from './redis';
import { createSchema } from './util/createSchema';

const init = async () => {
  await createConnection();

  const RedisStore = connectRedis(session);
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: 'sfsdfsdfsdf',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req }) => ({ req }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(config.PORT, () =>
    console.log(
      `🚀🚀 Server Started 🚀🚀     
      http://localhost:${config.PORT}${apolloServer.graphqlPath}`
    )
  );
};

init();
