import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { apolloServer } from "./apollo";
import { createConnection } from "typeorm";
import { ormconfig } from "./ormconfig";
import { refreshToken } from "./auth/refreshToken";

///////////////////////////////////////////////

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const origin =
  process.env.NODE_ENV === "production"
    ? "https://capsule.app/"
    : "http://localhost:3000";

const url =
  process.env.NODE_ENV === "production"
    ? "https://capsule.app/api"
    : "http://localhost:4000/graphql";

///////////////////////////////////////////////

(async () => {
  await createConnection(ormconfig);
  const apollo = await apolloServer();

  const app = express();

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: origin,
      credentials: true,
    })
  );

  app.post("/refresh", (req, res) => refreshToken(req, res));

  apollo.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log(`Server listening at ${url}`);
  });
})();
