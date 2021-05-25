import {
  Resolver,
  Query,
  Mutation,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { Space } from "../../entity/Space";
import { Member } from "../../entity/Member";
import { CreateSpaceInput } from "./CreateSpaceInput";
import { nanoid } from "nanoid";
import { Context } from "../../types/Context";
import { hasSession } from "../../auth/hasSession";

@Resolver(Space)
export class SpaceResolver {
  @Query(() => [Space], { nullable: true })
  spaces(): Promise<Array<Space>> {
    return Space.find();
  }

  @Query(() => Space, { nullable: true })
  space(@Arg("id") id: string) {
    return Space.findOne(id);
  }

  @Query(() => Space, { nullable: true })
  spaceByName(@Arg("name") name: string) {
    return Space.findOne({ where: { name } });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async createSpace(
    @Arg("data") { name }: CreateSpaceInput,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    await Space.create({
      id: nanoid(),
      createdAt: String(Date.now()),
      name,
      authorId: req.session.userId,
    }).save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(hasSession)
  async joinSpace(
    @Ctx() { req }: Context,
    @Arg("spaceId", () => String) spaceId: string
  ) {
    await Member.create({ userId: req.session.userId, spaceId }).save();
    return true;
  }
}
