import { Entity, PrimaryColumn, BaseEntity, ManyToMany, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Member } from "./Member";
import { SpacePost } from "./SpacePost";
import { Post } from "./Post";
import { authorLoader } from "../loaders/AuthorLoader";
import { RelationshipLoader } from "../loaders/RelationshipLoader";

const memberLoader = RelationshipLoader(Member, User, "user", "spaceId");
const postLoader = RelationshipLoader(SpacePost, Post, "post", "spaceId");

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

  @Field(() => String, { nullable: true })
  @Column("character varying", { default: "" })
  avatarUrl: string;

  @Field(() => String, { nullable: true })
  @Column("character varying", { default: "" })
  description: string;

  @Field()
  @Column()
  createdAt: string;

  @ManyToMany(() => Member, (member) => member.space, { onDelete: "CASCADE" })
  FK_members: Promise<Member[]>;

  @ManyToMany(() => SpacePost, (spacePost) => spacePost.space, {
    onDelete: "CASCADE",
  })
  FK_posts: Promise<SpacePost[]>;

  @Field(() => User, { nullable: true })
  async author(): Promise<User> {
    return await authorLoader.load(this.authorId);
  }

  @Field(() => [User], { nullable: true })
  async members(): Promise<User[]> {
    return await memberLoader.load(this.id);
  }

  @Field(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    return await postLoader.load(this.id);
  }
}
