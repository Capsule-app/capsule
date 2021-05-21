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
import { CreatePostInput } from "./CreatePostInput";
import { nanoid } from "nanoid";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User, { nullable: true })
  async author(@Root() parent: Post): Promise<User | undefined> {
    return await User.findOne({ where: { id: parent.authorId } });
  }

  @Query(() => [Post])
  posts(): Promise<Array<Post>> {
    return Post.find();
  }

  @Query(() => Post)
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
      content,
      authorId: ctx.payload!.userId,
    }).save();

    return true;
  }
}
