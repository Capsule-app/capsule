import { MiddlewareFn } from "type-graphql";
import { Context } from "../types/Context";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) throw new Error("Invalid authorization");

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as any;
  } catch (err) {
    throw new Error("token error");
  }

  return next();
};
