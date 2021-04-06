import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../types/AppContext';
import { User } from '../User.entity';

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: AppContext
  ): Promise<User | null> {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) return null;

    if (!user.confirmed) return null;

    ctx.req.session.userId = user.id;
    return user;
  }
}
