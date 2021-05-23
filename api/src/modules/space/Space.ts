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
import { Space } from "../../entity/Space";
import { User } from "../../entity/User";
import { Member } from "../../entity/Member";
import { CreateSpaceInput } from "./CreateSpaceInput";
import { nanoid } from "nanoid";
import { isAuth } from "../../auth/isAuth";
import { Context } from "../../types/Context";
import { authorLoader } from "../loaders/AuthorLoader";

@Resolver(Space)
export class SpaceResolver {
  @FieldResolver(() => User, { nullable: true })
  async author(@Root() parent: Space): Promise<User | null> {
    return await authorLoader.load(parent.authorId);
  }

  @Query(() => [Space], { nullable: true })
  spaces(): Promise<Array<Space>> {
    return Space.find();
  }

  @Query(() => Space, { nullable: true })
  space(@Arg("id") id: string) {
    return Space.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSpace(
    @Arg("data") { name }: CreateSpaceInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    await Space.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      name,
      authorId: ctx.payload!.userId,
    }).save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinSpace(
    @Ctx() ctx: Context,
    @Arg("spaceId", () => String) spaceId: string
  ) {
    await Member.create({ userId: ctx.payload!.userId, spaceId }).save();
    return true;
  }
}
