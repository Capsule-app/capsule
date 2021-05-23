import { Field, InputType } from "type-graphql";

@InputType()
export class QueryInput {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;
}
