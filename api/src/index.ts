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
import session from "express-session";
import { refreshToken } from "./auth/refreshToken";
import connectRedis from "connect-redis";
import redis from "ioredis";

import { UserResolver } from "./modules/user/User";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import { PostResolver } from "./modules/post/Post";
import { CommentResolver } from "./modules/comment/Comment";
import { SpaceResolver } from "./modules/space/Space";

const RedisStore = connectRedis(session);

const main = async () => {
  await createConnection(ormconfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        RegisterResolver,
        LoginResolver,
        PostResolver,
        CommentResolver,
        SpaceResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
    introspection: true,
    playground: true,
  });

  const app = express();

  app.use(cookieParser());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(
    cors({
      origin: `${
        process.env.NODE_ENV === "production"
          ? "https://capsule.app/"
          : "http://localhost:3000"
      }`,
      credentials: true,
    })
  );
  app.use(
    session({
      name: "connect",
      store: new RedisStore({ client: new redis() }),
      secret: process.env.REFRESH_TOKEN_SECRET || "somerandomstring",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      },
    })
  );

  app.post("/refresh", (req, res) => refreshToken(req, res));

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(
      `Server listening at ${
        process.env.NODE_ENV === "production"
          ? "https://capsule.app/api"
          : "http://localhost:4000/graphql"
      }`
    );
  });
};

main();
