import { Field, InputType } from "type-graphql";

@InputType()
export class CreateVoteInput {
  @Field()
  action: boolean;

  @Field()
  postId: string;
}
