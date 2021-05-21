import { ReqContext } from "../../types/ReqContext";
import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: ReqContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined;

    return await User.findOne(ctx.req.session!.userId);
  } 
}