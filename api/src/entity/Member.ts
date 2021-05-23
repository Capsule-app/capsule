import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";
import { Space } from "./Space";

@Entity()
export class Member extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  spaceId: string;

  @ManyToOne(() => User, (user) => user.FK_memberships, { primary: true })
  @JoinColumn({ name: "userId" })
  user: Promise<User>;

  @ManyToOne(() => Space, (space) => space.FK_members, {
    primary: true,
  })
  @JoinColumn({ name: "spaceId" })
  space: Promise<Space>;
}
