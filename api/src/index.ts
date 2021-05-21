import { config } from "dotenv";
config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { MeResolver } from "./modules/user/Me";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import cors from "cors";
import cookieParser from "cookie-parser";
import { refreshToken } from "./auth/refreshToken";

const main = async () => {
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MeResolver, RegisterResolver, LoginResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(cookieParser());
  app.use(cors());

  app.post("/refresh", (req, res) => refreshToken(req, res));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server listening at http://localhost:4000/graphql");
  });
};

main();
