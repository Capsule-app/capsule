import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import connectRedis from "connect-redis";
import redis from "ioredis";

import { apolloServer } from "./apollo";
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import { refreshToken } from "./auth/refreshToken";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const RedisStore = connectRedis(session as any);

(async () => {
  await createConnection(ormconfig);
  const apollo = await apolloServer();

  const app = express();

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
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
      store: new RedisStore({ client: new redis() }) as any,
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

  apollo.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(
      `Server listening at ${
        process.env.NODE_ENV === "production"
          ? "https://capsule.app/api"
          : "http://localhost:4000/graphql"
      }`
    );
  });
})();
