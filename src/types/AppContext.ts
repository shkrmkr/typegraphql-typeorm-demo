import { ExpressContext } from 'apollo-server-express';

export type AppContext = Pick<ExpressContext, 'req'>;
