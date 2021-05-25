import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";
import { CreateCommentInput } from "./CreateCommentInput";
import { nanoid } from "nanoid";
import { Context } from "../../types/Context";
import { hasSession } from "../../auth/hasSession";

@Resolver(Comment)
export class CommentResolver {
  @Query(() => [Comment])
  comments(): Promise<Array<Comment>> {
    return Comment.find({ order: { createdAt: "DESC" } });
  }

  @Query(() => Post, { nullable: true })
  comment(@Arg("id") id: string) {
    return Comment.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createComment(
    @Arg("data") { content, postId }: CreateCommentInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await Comment.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      content,
      authorId: ctx.req.session.userId,
      postId,
    }).save();

    return true;
  }
}
