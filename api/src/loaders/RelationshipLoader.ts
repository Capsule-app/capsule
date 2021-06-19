import { In } from "typeorm";
import DataLoader from "dataloader";

export const RelationshipLoader = (
  relationalEntity: any,
  exportEntity: any,
  field: string,
  joinField: string
) => {
  return new DataLoader(
    async (keys: string[]) => {
      const select = {};
      select[field] = "x." + field;

      const join = {};
      join[joinField] = In(keys);

      const exports = await relationalEntity.find({
        join: {
          alias: "x",
          innerJoinAndSelect: select,
        },
        where: join,
      });

      const fieldToExports: { [key: string]: typeof exportEntity[] } = {};

      exports.forEach((ab: typeof exportEntity) => {
        if (ab[joinField] in fieldToExports) {
          fieldToExports[ab[joinField]].push((ab as any)["__" + field + "__"]);
        } else {
          fieldToExports[ab[joinField]] = [(ab as any)["__" + field + "__"]];
        }
      });

      return keys.map((id) => fieldToExports[id]);
    },
    { cache: false }
  );
};
