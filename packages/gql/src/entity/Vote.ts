import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  action: boolean;

  @Column()
  @Field()
  postId: string;

  @Column()
  @Field()
  authorId: string;
}
