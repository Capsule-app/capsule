import { Entity, PrimaryColumn, Column, BaseEntity, ManyToMany } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { Space } from "./Space";
import { Post } from "./Post";
import { Member } from "./Member";
import { Photo } from "./Photo";
import { RelationshipLoader } from "../loaders/RelationshipLoader";
import { photoLoader } from "../loaders/PhotoLoader";

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

  @Column({ default: "" })
  photoId: string;

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: string;

  @Field()
  @Column("text", { default: "" })
  createdAt: string;

  @ManyToMany(() => Space, (space) => space.members)
  R_memberships: Promise<Space[]>;

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

  @Field(() => Photo, { nullable: true })
  async photo(): Promise<Photo> {
    return await photoLoader.load(this.photoId);
  }
}
