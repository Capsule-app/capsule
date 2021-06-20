import { Resolver, Ctx, Mutation, UseMiddleware, Arg } from "type-graphql";
import { Post } from "../../entity/Post";
import { SpacePost } from "../../entity/SpacePost";
import { Context } from "../../types/Context";
import { getUserId, hasSession } from "../../auth/session";
import { CreatePostInput } from "./Create.input";
import { nanoid } from "nanoid";

@Resolver()
export class CreatePostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createPost(
    @Ctx() ctx: Context,
    @Arg("data") { content, spaceId }: CreatePostInput
  ): Promise<Boolean> {
    const authorId = getUserId(ctx);
    const post = await Post.create({
      content,
      id: nanoid(),
      createdAt: String(Date.now()),
      authorId,
    }).save();

    if (spaceId)
      await SpacePost.create({
        postId: post.id,
        spaceId,
      }).save();

    return !!post;
  }
}
