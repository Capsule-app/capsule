import { Member } from "../../entity/Member";
import { User } from "../../entity/User";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const membershipLoader = new DataLoader(async (keys: string[]) => {
  const spaces = await Member.find({
    join: {
      alias: "membership",
      innerJoinAndSelect: { test: "membership.space" },
    },
    where: { userId: In(keys) },
  });

  const memberIdToSpace: { [key: number]: User[] } = {};

  spaces.forEach((ab) => {
    if (ab.spaceId in memberIdToSpace) {
      memberIdToSpace[ab.userId].push((ab as any).__space__);
    } else {
      memberIdToSpace[ab.userId] = [(ab as any).__space__];
    }
  });

  return keys.map((userId) => memberIdToSpace[userId]);
});
