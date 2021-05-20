import { IsEmail, Length, MaxLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  username: string;

  @Field()
  @MaxLength(300)
  bio: string;

  @Field()
  @Length(6, 255)
  @IsEmail()
  email: string;

  @Field()
  password: string;
}