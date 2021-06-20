import { Photo } from "../entity/Photo";
import { In } from "typeorm";
import DataLoader from "dataloader";

export const photoLoader = new DataLoader(
  async (keys: string[]) => {
    const photos = await Photo.find({ where: { id: In(keys) } });

    const photoMap = {};
    photos.forEach((x) => {
      photoMap[x.id] = x;
    });

    return keys.map((key) => photoMap[key]);
  },
  { cache: false }
);
