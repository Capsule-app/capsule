import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field({ nullable: true })
  spaceId?: string;
}
