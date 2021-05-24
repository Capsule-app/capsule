import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Post } from "./Post";
import { Space } from "./Space";

@Entity()
export class SpacePost extends BaseEntity {
  @PrimaryColumn()
  postId: string;

  @PrimaryColumn()
  spaceId: string;

  @ManyToOne(() => Post, (post) => post.FK_memberships, { primary: true })
  @JoinColumn({ name: "postId" })
  post: Promise<Post>;

  @ManyToOne(() => Space, (space) => space.FK_members, {
    primary: true,
  })
  @JoinColumn({ name: "spaceId" })
  space: Promise<Space>;
}
