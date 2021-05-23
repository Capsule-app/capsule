import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  Column,
} from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Space extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  authorId: string;

  @Field()
  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.memberships)
  @JoinTable()
  @Field(() => [User])
  members: Promise<User[]>;

  @Field()
  @Column()
  createdAt: string;
}
