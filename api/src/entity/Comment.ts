import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { authorLoader } from "../modules/loaders/AuthorLoader";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  postId: string;

  @Field()
  @Column()
  authorId: string;

  @Field()
  @Column()
  createdAt: string;

  @Field(() => User, { nullable: true })
  author(): Promise<User> {
    return authorLoader.load(this.authorId);
  }
}
