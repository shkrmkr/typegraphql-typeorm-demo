import { MiddlewareFn } from 'type-graphql';
import { AppContext } from '../types/AppContext';

export const isAuthenticated: MiddlewareFn<AppContext> = async (
  { context },
  next
) => {
  if (!context.req.session.userId) {
    throw new Error('Not authenticated');
  }

  return next();
};
