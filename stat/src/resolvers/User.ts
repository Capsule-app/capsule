import { client } from "@root/db";

export const User = async (_, { name }) => {
  const user = await client.query("select * from public.users where name = $1", [name]);
  const posts = await client.query("select * from public.posts where user_id = $1", [user?.rows[0].id])
  return { ...user.rows[0], posts: posts.rows };
}