import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";
// import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const session = context.req.session.userId;
  console.log("session:", context);
  if (!session) throw new Error("Invalid authorization");

  // try {
  //   const payload = verify(session, process.env.ACCESS_TOKEN_SECRET!);
  //   context.payload = payload as any;
  // } catch (err) {
  //   throw new Error("token error");
  // }

  context.payload = context.req.session as any;

  return next();
};
