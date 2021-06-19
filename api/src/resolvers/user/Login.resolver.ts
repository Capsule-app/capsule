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
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Could not find a user with that email");

    const valid = await compare(password, user.password);
    if (!valid) throw new Error("Incorrect password");

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }
}
