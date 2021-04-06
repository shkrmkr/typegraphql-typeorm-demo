import { graphql, GraphQLArgs, GraphQLSchema } from 'graphql';
import { createSchema } from '../util/createSchema';

let schema: GraphQLSchema;

type GqlArgs = Pick<GraphQLArgs, 'variableValues' | 'source'> & {
  userId?: number;
};

export const callGql = async ({ source, variableValues, userId }: GqlArgs) => {
  if (!schema) {
    schema = await createSchema();
  }

  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      req: {
        session: { userId },
      },
    },
  });
};
