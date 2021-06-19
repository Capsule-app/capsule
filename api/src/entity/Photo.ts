import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Space } from "./Space";
import { User } from "./User";
import { RelationshipLoader } from "../loaders/RelationshipLoader";
import { SpacePhoto } from "./SpacePhoto";

const groupLoader = RelationshipLoader(SpacePhoto, Space, "space", "photoId");

@ObjectType()
@Entity()
export class Photo extends BaseEntity {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  url: string;

  @Column()
  @Field()
  createdAt: string;

  @Column()
  ownerId: string;

  @ManyToMany(() => Space, (space) => space.photos, { onDelete: "CASCADE" })
  R_spaces: Promise<Space[]>;

  @Field(() => User, { nullable: true })
  author(): Promise<User> {
    return User.findOne(this.ownerId);
  }

  @Field(() => [Space], { nullable: true })
  async space(): Promise<Space[] | null> {
    return await groupLoader.load(this.id);
  }
}
