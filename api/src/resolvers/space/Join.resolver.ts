import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Space } from "../../entity/Space";
import { Member } from "../../entity/Member";
import { Context } from "../../types/Context";
import { getUserId, hasSession } from "../../auth/session";

@Resolver(Space)
export class SpaceResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async joinSpace(
    @Ctx() ctx: Context,
    @Arg("spaceId", () => String) spaceId: string
  ) {
    const userId = getUserId(ctx);
    await Member.create({ userId, spaceId }).save();
    return true;
  }
}
