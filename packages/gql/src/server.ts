import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./createSchema";

export const createApolloServer = async (): Promise<ApolloServer> => {
  const schema = await createSchema();

  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: {
      settings: {
        "request.credentials": "same-origin",
      },
    },
  });
};
