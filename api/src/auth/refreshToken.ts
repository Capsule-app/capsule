import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";
import { createAccessToken } from "./createTokens";
import { sendRefreshToken } from "./sendRefreshToken";

export const refreshToken = async (req: Request, res: Response) => {
  const token = req.headers["authorization"];
  if (!token) return res.send({ ok: false, accessToken: "" });

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_SECRET!);
  } catch (err) {
    return res.send({ ok: false, accessToken: "" });
  }

  // token is valid
  const user = await User.findOne({ id: payload.userId });
  if (!user) return res.send({ ok: false, accessToken: "" });

  if (user.tokenVersion !== payload.tokenVersion)
    return res.send({ ok: false, accessToken: "" });

  sendRefreshToken(res, token);

  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
