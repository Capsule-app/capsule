import { User } from "../entity/User";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const authorLoader = new DataLoader(async (keys: string[]) => {
  const authors = await User.find({ where: { id: In(keys) } });

  const authorMap = {};
  authors.forEach((author) => {
    authorMap[author.id] = author;
  });

  return keys.map((key) => authorMap[key]);
});
