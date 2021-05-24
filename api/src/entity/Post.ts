import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import {
  commentLoader,
  commentCountLoader,
} from "../modules/loaders/CommentLoader";
import { Space } from "./Space";
import { authorLoader } from "../modules/loaders/AuthorLoader";

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

  @ManyToMany(() => Space, (space) => space.members)
  FK_memberships: Promise<Space[]>;

  @Field(() => User, { nullable: true })
  author(): Promise<User | null> {
    return authorLoader.load(this.authorId);
  }

  @Field(() => Int, { nullable: true })
  commentCount(): Promise<number> {
    return commentCountLoader.load(this.id);
  }

  @Field(() => [Comment], { nullable: true })
  comments(): Promise<Comment[]> {
    return commentLoader.load(this.id);
  }
}
