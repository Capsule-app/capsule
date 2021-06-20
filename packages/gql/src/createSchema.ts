import { buildSchema } from "type-graphql";
import { glob as _glob } from "glob";
import { promisify } from "util";

const glob = promisify(_glob);

export const createSchema = async () => {
  const filenames = await glob(`${__dirname}/resolvers/**/*.resolver.*`);

  const resolvers: any = filenames
    .map((filename) => Object.values(require(filename)))
    .flat();

  return buildSchema({
    resolvers,
    emitSchemaFile: "./schema.gql",
  });
};
