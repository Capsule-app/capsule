import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello world!"
  }

  @Mutation(() => User)
  async register(
    @Arg("data") {name, username, bio, email, password}: RegisterInput
  ): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      bio,
      email,
      password: hashed
    }).save();

    return user;
  }
}