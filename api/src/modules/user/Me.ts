import { Context } from "../../types/Context";
import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined;

    return await User.findOne(ctx.req.session!.userId);
  }
}
