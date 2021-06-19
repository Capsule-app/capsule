import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Space } from "./Space";
import { Photo } from "./Photo";

@Entity()
export class SpacePhoto extends BaseEntity {
  @PrimaryColumn()
  photoId: string;

  @PrimaryColumn()
  spaceId: string;

  @ManyToOne(() => Photo, (photo) => photo.R_spaces, { primary: true })
  @JoinColumn({ name: "photoId" })
  photo: Promise<Photo>;

  @ManyToOne(() => Space, (space) => space.R_photos, {
    primary: true,
  })
  @JoinColumn({ name: "spaceId" })
  group: Promise<Space>;
}
