import { Entity, PrimaryColumn, BaseEntity, ManyToMany, Column } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Member } from "./Member";
import { memberLoader } from "../modules/loaders/MemberLoader";

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

  @Field(() => [User], { nullable: true })
  async members(): Promise<User[]> {
    return await memberLoader.load(this.id);
  }
}
