import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(() => String, { nullable: true })
  spaceId: string;
}
