import 'express';
import { Session } from 'express-session';
import { User } from './user/User.entity';

declare module 'express' {
  interface Request {
    session: Session & {
      userId: User['id'] | undefined;
    };
  }
}
