import { Arg, Mutation, Resolver } from 'type-graphql';
import { redis } from '../../redis';
import { RedisEmailRepo } from '../../util/RedisEmailRepo';
import { User } from '../User.entity';

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await RedisEmailRepo.getItem('CONFIRM_USER', token);
    if (!userId) return false;
    await User.update({ id: parseInt(userId) }, { confirmed: true });
    await redis.del(token);
    return true;
  }
}
