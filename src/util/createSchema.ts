import { buildSchema } from 'type-graphql';

export const createSchema = () =>
  buildSchema({
    resolvers: [__dirname + '/../**/*.resolver.ts'],
    authChecker: ({ context }) => !!context.req.session.userId,
  });
