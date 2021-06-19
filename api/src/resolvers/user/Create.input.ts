import { Field, InputType } from "type-graphql";
import { IsEmail, Length, MaxLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @Length(6, 255)
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
