import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User} from "../../entity/User";

@Resolver(User)
export class RegisterResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello world!"
  }

  @FieldResolver()
  async summary(@Root() parent: User) {
    return `${parent.name}: ${parent.bio}`;
  }

  @Mutation(() => User)
  async register(
    @Arg("name") name: string, 
    @Arg("username") username: string,
    @Arg("bio") bio: string,
    @Arg("email") email: string, 
    @Arg("password") password: string
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