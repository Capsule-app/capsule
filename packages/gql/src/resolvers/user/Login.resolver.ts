import { ObjectType, Arg, Mutation, Resolver, Field } from "type-graphql";
import { User } from "../../entity/User";
import { createAccessToken } from "../../auth/createTokens";
import bcrypt from "bcryptjs";

@ObjectType()
class LoginResponse {
  @Field()
  token: string;
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Could not find a user with that email");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Incorrect password");

    return {
      token: createAccessToken(user),
    };
  }
}
