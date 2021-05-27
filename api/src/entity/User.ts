import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Space } from "./Space";
import { membershipLoader } from "../modules/loaders/MembershipLoader";
import { Post } from "./Post";

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

  @Field()
  @Column("text", { default: "" })
  createdAt: string;

  @ManyToMany(() => Space, (space) => space.members)
  FK_memberships: Promise<Space[]>;

  @Field(() => [Space], { nullable: true })
  memberships(): Promise<Space[] | undefined> {
    return membershipLoader.load(this.id);
  }

  @Field(() => [Post], { nullable: true })
  posts(): Promise<Post[] | undefined> {
    return Post.find({
      where: { authorId: this.id },
      order: { createdAt: "DESC" },
    });
  }
}
