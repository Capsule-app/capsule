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
import { isAuth } from "../../auth/isAuth";
import { Context } from "../../types/Context";
import { QueryInput } from "./QueryInput";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() ctx: Context): Promise<User | undefined> {
    // @todo Fix isAuth middleware
    // if (!ctx.payload!.userId) return undefined;

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
    return User.findOne({ where: { username: username } });
  }

  @Query(() => User, { nullable: true })
  userByQuery(@Arg("query") query: QueryInput): Promise<User | undefined> {
    return User.findOne({ where: query });
  }

  @Query(() => String, { nullable: true })
  cookies(@Ctx() ctx: Context) {
    return ctx.req.session.userId;
  }

  @Mutation(() => Boolean)
  async revokeUserRefreshTokens(@Arg("userId", () => String) userId: string) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
}
