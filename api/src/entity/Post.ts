import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  getConnection,
} from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import {
  commentLoader,
  commentCountLoader,
} from "../modules/loaders/CommentLoader";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  authorId: string;

  @Field()
  @Column()
  createdAt: string;

  @Field(() => User, { nullable: true })
  author: User;

  @Field(() => Int, { nullable: true })
  commentCount(): Promise<number> {
    return commentCountLoader.load(this.id);
  }

  @Field(() => [Comment], { nullable: true })
  comments(): Promise<Comment[]> {
    return commentLoader.load(this.id);
  }
}
