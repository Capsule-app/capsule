import { Field, InputType } from "type-graphql";
import { IsEmail, Length, MaxLength } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  name?: string;

  @Field({ nullable: true })
  @MaxLength(30)
  username?: string;

  @Field({ nullable: true })
  @Length(6, 255)
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  photoId?: string;
}
