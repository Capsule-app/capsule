import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Space } from "./Space";
import { Post } from "./Post";
import { Member } from "./Member";
// import { membershipLoader } from "../modules/loaders/MembershipLoader";
import { RelationshipLoader } from "../loaders/RelationshipLoader";

const membershipLoader = RelationshipLoader(Member, Space, "space", "userId");

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
  spaces(): Promise<Space[] | undefined> {
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
