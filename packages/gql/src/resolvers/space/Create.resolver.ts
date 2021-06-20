import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";
import { Space } from "../../entity/Space";
import { CreateSpaceInput } from "./Create.input";
import { nanoid } from "nanoid";
import { Context } from "../../types/Context";
import { getUserId, hasSession } from "../../auth/session";

@Resolver(Space)
export class SpaceResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createSpace(
    @Arg("data") { name }: CreateSpaceInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const authorId = getUserId(ctx);
    const space = await Space.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      name,
      authorId,
    }).save();

    return !!space;
  }
}
