import { nanoid } from 'nanoid';
import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { getAuthActionUrl } from '../../util/getAuthActionUrl';
import { RedisEmailRepo } from '../../util/RedisEmailRepo';
import { sendEmail } from '../../util/sendEmail';
import { User } from '../User.entity';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @Authorized()
  @Query(() => String)
  async hello() {
    return 'Hello World 👋👋';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    const token = nanoid();
    await RedisEmailRepo.setItem('CONFIRM_USER', token, user.id);
    const authActionUrl = getAuthActionUrl('CONFIRM_USER', token);
    await sendEmail(email, authActionUrl);
    return user;
  }
}
