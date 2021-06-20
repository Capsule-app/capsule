import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { CreateUserInput } from "./Create.input";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

@Resolver()
export class CreateUserResolver {
  @Mutation(() => Boolean)
  async createUser(@Arg("data") input: CreateUserInput): Promise<boolean> {
    const hashed = await bcrypt.hash(input.password, 10);

    const user = await User.create({
      ...input,
      id: nanoid(),
      password: hashed,
    }).save();

    return !!user;
  }
}
