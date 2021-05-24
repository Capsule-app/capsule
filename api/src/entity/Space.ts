import { Entity, PrimaryColumn, BaseEntity, ManyToMany, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Member } from "./Member";
import { SpacePost } from "./SpacePost";
import { memberLoader } from "../modules/loaders/MemberLoader";
import { Post } from "./Post";
import { postLoader } from "../modules/loaders/PostLoader";
import { authorLoader } from "../modules/loaders/AuthorLoader";

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
