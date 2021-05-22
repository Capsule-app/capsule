import { config } from "dotenv";
config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import cors from "cors";
import cookieParser from "cookie-parser";
import { refreshToken } from "./auth/refreshToken";

import { UserResolver } from "./modules/user/User";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { PostResolver } from "./modules/post/Post";

const main = async () => {
  await createConnection(ormconfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, RegisterResolver, LoginResolver, PostResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(cookieParser());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.post("/refresh", (req, res) => refreshToken(req, res));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("Server listening at http://localhost:4000/graphql");
  });
};

main();
