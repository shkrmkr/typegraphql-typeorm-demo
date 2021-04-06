import { nanoid } from 'nanoid';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { getAuthActionUrl } from '../../util/getAuthActionUrl';
import { RedisEmailRepo } from '../../util/RedisEmailRepo';
import { sendEmail } from '../../util/sendEmail';
import { User } from '../User.entity';

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) return true;

    const token = nanoid();

    await RedisEmailRepo.setItem('FORGOT_PASSWORD', token, user.id);
    const authActionUrl = getAuthActionUrl('FORGOT_PASSWORD', token);

    await sendEmail(email, authActionUrl);

    return true;
  }
}
