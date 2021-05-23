import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Space } from "./Space";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column("text", { unique: true })
  username: string;

  @Field()
  @Column("text", { default: "" })
  bio: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text", { default: "" })
  avatarUrl: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: string;

  @ManyToMany(() => Space, (space) => space.members)
  memberships: Promise<Space[]>;
}
