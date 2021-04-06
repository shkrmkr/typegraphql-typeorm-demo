import { Arg, Mutation, Resolver } from 'type-graphql';
import { RedisEmailRepo } from '../../util/RedisEmailRepo';
import { User } from '../User.entity';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput
  ): Promise<User | null> {
    const userId = await RedisEmailRepo.getItem('FORGOT_PASSWORD', token);
    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;

    await RedisEmailRepo.removeItem('FORGOT_PASSWORD', token);

    user.password = await User.hashPassword(password);
    return await user.save();
  }
}
