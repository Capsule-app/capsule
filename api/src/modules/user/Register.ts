import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg("data") { name, username, email, password }: RegisterInput
  ): Promise<boolean> {
    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashed,
      id: nanoid(),
    }).save();

    return true;
  }
}
