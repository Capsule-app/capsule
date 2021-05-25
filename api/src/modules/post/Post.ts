import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Post } from "../../entity/Post";
import { CreatePostInput } from "./CreatePostInput";
import { nanoid } from "nanoid";
import { Context } from "../../types/Context";
import { SpacePost } from "../../entity/SpacePost";
import { hasSession } from "../../auth/hasSession";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post], { nullable: true })
  posts(): Promise<Array<Post>> {
    return Post.find({ order: { createdAt: "DESC" } });
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: string) {
    return Post.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createPost(
    @Arg("data") { content }: CreatePostInput,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const post = await Post.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      content,
      authorId: req.session.userId,
    }).save();

    await SpacePost.create({
      postId: post.id,
      spaceId: "U75ga6EMaROHkNNYOdjgQ",
    }).save();

    return true;
  }
}
