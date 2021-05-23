import { InputType, Field } from "type-graphql";

@InputType()
export class CreateSpaceInput {
  @Field()
  name: string;
}
