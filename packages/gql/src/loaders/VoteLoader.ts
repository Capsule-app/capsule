import { Vote } from "../entity/Vote";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const voteLoader = new DataLoader(async (keys: string[]) => {
  const votes = await Vote.find({
    where: { postId: In(keys) },
  });

  const postIdToVotes: { [key: number]: Vote[] } = {};

  votes.forEach((vote: Vote) => {
    if (vote.postId in postIdToVotes) {
      postIdToVotes[vote.postId].push(vote as any);
    } else {
      postIdToVotes[vote.postId] = [vote as any];
    }
  });

  return keys.map((key) => postIdToVotes[key]);
});

export const voteCountLoader = new DataLoader(async (keys: string[]) => {
  const votes = await Vote.find({
    select: ["postId"],
    where: { postId: In(keys) },
  });

  const postIdToVotes: { [key: number]: Vote[] } = {};

  votes.forEach((vote: Vote) => {
    if (vote.postId in postIdToVotes) {
      postIdToVotes[vote.postId].push(vote as any);
    } else {
      postIdToVotes[vote.postId] = [vote as any];
    }
  });

  return keys.map((key) => postIdToVotes[key]?.length || 0);
});
