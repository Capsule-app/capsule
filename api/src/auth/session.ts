import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

const verifySession = (context) => {
  const token = context.req.headers["authorization"];
  if (!token) throw new Error("You must be logged in to perform this action");

  const user = verify(token, process.env.TOKEN_SECRET) as any;
  if (!user) throw new Error("Session expired");

  return user.userId;
};

export const hasSession = async ({ context }, next) => {
  verifySession(context);
  return next();
};

export const getUser = async (context: any): Promise<User> => {
  const id = verifySession(context) as any;
  return User.findOne(id);
};

export const getUserId = (context: any): string => {
  return verifySession(context);
};
