import { config} from "dotenv";
config();

import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { connect, client } from "./db";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app });

  await connect();

  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  })
}

startServer();