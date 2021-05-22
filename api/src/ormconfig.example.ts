import { ConnectionOptions } from "typeorm";

export const ormconfig: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "capsule",
  password: "capsule$",
  database: "capsule",
  synchronize: true,
  entities: [`${__dirname}/entity/*.*`],
};
