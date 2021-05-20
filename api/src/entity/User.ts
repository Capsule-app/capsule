import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

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
  summary: string;

  @Column()
  password: string;
}