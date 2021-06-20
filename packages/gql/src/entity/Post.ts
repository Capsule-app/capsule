import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { User } from "./User";
import { Comment } from "./Comment";
import { Space } from "./Space";
import { Vote } from "./Vote";
import { authorLoader } from "../loaders/AuthorLoader";
import { spaceLoader } from "../loaders/SpaceLoader";
import { voteCountLoader, voteLoader } from "../loaders/VoteLoader";
import { commentLoader, commentCountLoader } from "../loaders/CommentLoader";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  content: string;

  @Column()
  authorId: string;

  @Field()
  @Column()
  createdAt: string;

  @ManyToMany(() => Space, (space) => space.members)
  R_spaces: Promise<Space[]>;

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

  @Field(() => Space, { nullable: true })
  space(): Promise<Space> {
    return spaceLoader.load(this.id);
  }

  @Field(() => [Vote], { nullable: true })
  votes(): Promise<Vote[]> {
    return voteLoader.load(this.id);
  }

  @Field(() => Int, { nullable: true })
  voteCount(): Promise<number> {
    return voteCountLoader.load(this.id);
  }
}
