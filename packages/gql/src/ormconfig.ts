import dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";
import { parse } from "pg-connection-string";
import { checkEnv } from "./checkEnv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
checkEnv();

const config = parse(process.env.DATABASE_URL);

export const ormconfig: ConnectionOptions = {
  type: "postgres",
  host: config.host,
  port: Number(config.port) || 5432,
  username: config.user,
  password: config.password,
  database: config.database,
  synchronize: true,
  entities: [`${__dirname}/entity/*.*`],
};
