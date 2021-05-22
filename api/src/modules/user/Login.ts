import { ObjectType, Arg, Mutation, Resolver, Field, Ctx } from "type-graphql";
import { compare } from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../../auth/createTokens";
import { User } from "../../entity/User";
import { Context } from "../../types/Context";
import { sendRefreshToken } from "../../auth/sendRefreshToken";

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
    @Ctx() { res }: Context
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await compare(password, user.password);
    if (!valid) return null;

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }
}
