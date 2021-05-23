import { Member } from "../../entity/Member";
import { User } from "../../entity/User";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const memberLoader = new DataLoader(async (keys: string[]) => {
  const members = await Member.find({
    join: { alias: "member", innerJoinAndSelect: { test: "member.user" } },
    where: { spaceId: In(keys) },
  });

  const spaceIdToMembers: { [key: number]: User[] } = {};

  members.forEach((ab) => {
    if (ab.spaceId in spaceIdToMembers) {
      spaceIdToMembers[ab.spaceId].push((ab as any).__user__);
    } else {
      spaceIdToMembers[ab.spaceId] = [(ab as any).__user__];
    }
  });

  return keys.map((spaceId) => spaceIdToMembers[spaceId]);
});
