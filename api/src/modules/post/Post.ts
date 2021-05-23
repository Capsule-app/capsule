import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
  Root,
  FieldResolver,
} from "type-graphql";
import { Post } from "../../entity/Post";
import { User } from "../../entity/User";
import { Comment } from "../../entity/Comment";
import { CreatePostInput } from "./CreatePostInput";
import { nanoid } from "nanoid";
import { isAuth } from "../../auth/isAuth";
import { Context } from "../../types/Context";
import { authorLoader } from "../loaders/AuthorLoader";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User, { nullable: true })
  async author(@Root() parent: Post): Promise<User | null> {
    return await authorLoader.load(parent.authorId);
  }

  @Query(() => [Post], { nullable: true })
  posts(): Promise<Array<Post>> {
    return Post.find({ order: { createdAt: "DESC" } });
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("id") id: string) {
    return Post.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("data") { content }: CreatePostInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await Post.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      content,
      authorId: ctx.payload!.userId,
    }).save();

    return true;
  }
}
