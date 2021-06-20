import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { UpdateUserInput } from "./Update.input";
import { hasSession, getUserId } from "../../auth/session";
import { Context } from "../../types/Context";
import bcrypt from "bcryptjs";

@Resolver()
export class UpdateUserResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async updateUser(
    @Ctx() ctx: Context,
    @Arg("data") input: UpdateUserInput
  ): Promise<boolean> {
    if (input.password) input.password = await bcrypt.hash(input.password, 10);
    if (input.username)
      if (await User.findOne({ where: { username: input.username } }))
        throw new Error("that username is already taken");

    const id = getUserId(ctx);
    const updated = User.update({ id }, input);

    return !!updated;
  }
}
