import { client } from "@root/db";

export const Users = async () => {
  const res = await client.query("select * from public.users");
  return res.rows;
}