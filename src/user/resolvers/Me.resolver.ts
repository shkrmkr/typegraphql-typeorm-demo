import { Ctx, Query, Resolver } from 'type-graphql';
import { AppContext } from '../../types/AppContext';
import { User } from '../User.entity';

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: AppContext): Promise<User | undefined> {
    const { userId } = ctx.req.session;

    if (!userId) {
      return undefined;
    }

    return await User.findOne(userId);
  }
}
