import { Entity, PrimaryColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType, Root } from "type-graphql";

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
  @Column()
  bio: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  summary(@Root() parent: User): string {
    return `${parent.name}: ${parent.bio}`;
  }

  @Column()
  password: string;

  @Column("int", { default: 0 })
  tokenVersion: string;
}
