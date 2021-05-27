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
import { QueryInput } from "./QueryInput";
import { hasSession } from "../../auth/hasSession";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(hasSession)
  me(@Ctx() ctx: Context): Promise<User | undefined> {
    return User.findOne(ctx.req.session.userId);
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
    return User.findOne({ where: { username: ILike(`%${username}%`) } });
  }

  @Query(() => User, { nullable: true })
  userByQuery(@Arg("query") query: QueryInput): Promise<User | undefined> {
    return User.findOne({ where: query });
  }

  @Mutation(() => Boolean)
  async revokeUserRefreshTokens(@Arg("userId", () => String) userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
