import { Resolver, Ctx, Mutation, UseMiddleware, Arg } from "type-graphql";
import { Vote } from "../../entity/Vote";
import { Context } from "../../types/Context";
import { getUserId, hasSession } from "../../auth/session";
import { CreateVoteInput } from "./Create.input";
import { nanoid } from "nanoid";

@Resolver()
export class CreateVoteResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createVote(
    @Ctx() ctx: Context,
    @Arg("data") { action, postId }: CreateVoteInput
  ): Promise<Boolean> {
    const authorId = getUserId(ctx);
    const vote = await Vote.create({
      id: nanoid(),
      action,
      postId,
      authorId,
    }).save();

    return !!vote;
  }
}
