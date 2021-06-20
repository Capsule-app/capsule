import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Comment } from "../../entity/Comment";
import { CreateCommentInput } from "./Create.input";
import { nanoid } from "nanoid";
import { Context } from "../../types/Context";
import { hasSession, getUserId } from "../../auth/session";

@Resolver()
export class CreateCommentResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createComment(
    @Ctx() ctx: Context,
    @Arg("data") input: CreateCommentInput
  ): Promise<boolean> {
    const authorId = getUserId(ctx);
    const comment = await Comment.create({
      ...input,
      id: nanoid(),
      authorId,
      createdAt: String(Date.now()),
    }).save();

    return !!comment;
  }
}
