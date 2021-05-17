import { Client } from "pg";

export const client = new Client();

export const connect = async () => {
  await client.connect();
}