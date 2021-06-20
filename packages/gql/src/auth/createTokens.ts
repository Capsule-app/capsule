import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.TOKEN_SECRET!, {
    expiresIn: "1h",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
