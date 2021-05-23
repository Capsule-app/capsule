import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field()
  postId: string;
}
