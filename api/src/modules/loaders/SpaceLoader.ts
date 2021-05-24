import { SpacePost } from "../../entity/SpacePost";
import { Space } from "../../entity/Space";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const spaceLoader = new DataLoader(async (keys: string[]) => {
  const spaces = await SpacePost.find({
    join: { alias: "post", innerJoinAndSelect: { space: "post.space" } },
    where: { postId: In(keys) },
  });

  const postIdToSpace: { [key: string]: Space } = {};

  spaces.forEach((ab) => {
    postIdToSpace[ab.postId] = (ab as any).__space__;
  });

  return keys.map((spaceId) => postIdToSpace[spaceId]);
});
