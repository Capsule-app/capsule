import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { checkEnv } from "./checkEnv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

checkEnv();

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [`${__dirname}/entity/*.*`],
};
