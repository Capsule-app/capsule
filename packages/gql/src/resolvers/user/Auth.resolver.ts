import {
  Resolver,
  Query,
  Ctx,
  Arg,
  Mutation,
  UseMiddleware,
} from "type-graphql";
import { getConnection, ILike } from "typeorm";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import { hasSession, getUser, getUserId } from "../../auth/session";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(hasSession)
  async me(@Ctx() ctx: Context): Promise<User | undefined> {
    return await getUser(ctx);
  }

  @Query(() => User, { nullable: true })
  userByUsername(@Arg("username") username: string) {
    return User.findOne({ where: { username: ILike(`%${username}%`) } });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async revokeTokens(@Ctx() ctx: Context) {
    const id = getUserId(ctx);
    const user = await getConnection()
      .getRepository(User)
      .increment({ id }, "tokenVersion", 1);

    return !!user;
  }
}
