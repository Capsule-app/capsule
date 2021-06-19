import { ApolloServer } from "apollo-server-express";
import { generateSchema } from "./generateSchema";

export const apolloServer = async () => {
  const schema = await generateSchema();

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
