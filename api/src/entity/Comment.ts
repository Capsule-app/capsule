import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

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

  @Field(() => User)
  author: User;
}
