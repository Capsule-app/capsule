import { ObjectType, Arg, Mutation, Resolver, Field, Ctx } from "type-graphql";
import { compare } from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../../auth";

import { User } from "../../entity/User";
import { Context } from "../../types/Context";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: Context
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await compare(password, user.password);
    if (!valid) return null;

    res.cookie("qid", createRefreshToken(user), {
      httpOnly: true,
    });

    console.log(req);

    return {
      accessToken: createAccessToken(user),
    };
  }
}
