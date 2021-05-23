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
import { Space } from "../../entity/Space";
import { isAuth } from "../../auth/isAuth";
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
  users(): Promise<Array<User>> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => User, { nullable: true })
  userByUsername(@Arg("username") username: string) {
    return User.findOne({ where: { username: username } });
  }

  @Mutation(() => Boolean)
  async revokeUserRefreshTokens(@Arg("userId", () => String) userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinSpace(
    @Arg("spaceId") spaceId: string,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const user = await User.findOne(ctx.payload!.userId);
    if (!user) return false;
    const space = await Space.findOne(spaceId);
    if (!space) return false;

    console.log(await user.memberships);
    user.memberships = Promise.resolve([...(await user.memberships), space]);

    user.save();

    return true;
  }
}
