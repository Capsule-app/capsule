import { SpacePost } from "../../entity/SpacePost";
import { Post } from "../../entity/Post";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const postLoader = new DataLoader(async (keys: string[]) => {
  const posts = await SpacePost.find({
    join: { alias: "space", innerJoinAndSelect: { post: "space.post" } },
    where: { spaceId: In(keys) },
  });

  const spaceIdToPosts: { [key: string]: Post[] } = {};

  posts.forEach((ab) => {
    if (ab.spaceId in spaceIdToPosts) {
      spaceIdToPosts[ab.spaceId].push((ab as any).__post__);
    } else {
      spaceIdToPosts[ab.spaceId] = [(ab as any).__post__];
    }
  });

  return keys.map((spaceId) => spaceIdToPosts[spaceId]);
});
