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
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    if (!ctx.payload!.userId) return undefined;

    return await User.findOne(ctx.payload!.userId);
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async revokeUserRefreshTokens(@Arg("userId", () => String) userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
