import { Comment } from "../entity/Comment";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const commentLoader = new DataLoader(async (keys: string[]) => {
  const comments = await Comment.find({
    where: { postId: In(keys) },
  });

  const postIdToComments: { [key: number]: Comment[] } = {};

  comments.forEach((ab) => {
    if (ab.postId in postIdToComments) {
      postIdToComments[ab.postId].push(ab as any);
    } else {
      postIdToComments[ab.postId] = [ab as any];
    }
  });

  return keys.map((spaceId) => postIdToComments[spaceId]);
});

export const commentCountLoader = new DataLoader(async (keys: string[]) => {
  const comments = await Comment.find({
    select: ["postId"],
    where: { postId: In(keys) },
  });

  const postIdToComments: { [key: string]: Comment[] } = {};

  comments.forEach((ab) => {
    if (ab.postId in postIdToComments) {
      postIdToComments[ab.postId].push(ab as any);
    } else {
      postIdToComments[ab.postId] = [ab as any];
    }
  });

  return keys.map((postId) => postIdToComments[postId]?.length || 0);
});
