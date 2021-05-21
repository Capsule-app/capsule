import {
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  Arg,
  Mutation,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    if (!ctx.payload!.userId) return undefined;

    return await User.findOne(ctx.payload!.userId);
  }

  @Mutation(() => Boolean)
  async revokeUserRefreshTokens(@Arg("userId", () => String) userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() ctx: Context) {
    return `your user id is ${ctx.payload!.userId}`;
  }
}
