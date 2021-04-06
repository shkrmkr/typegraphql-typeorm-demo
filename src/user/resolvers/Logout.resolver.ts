import { Ctx, Mutation, Resolver } from 'type-graphql';
import { AppContext } from '../../types/AppContext';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: AppContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
      ctx.req.session.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        ctx.req.res?.clearCookie('qid');
        return resolve(true);
      });
    });
  }
}
