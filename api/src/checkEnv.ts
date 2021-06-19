export const checkEnv = () => {
  if (!process.env.TOKEN_SECRET)
    throw new Error("You must set TOKEN_SECRET in your .env");
  if (!process.env.REFRESH_SECRET)
    throw new Error("You must set REFRESH_SECRET in your .env");
  if (!process.env.DATABASE_URL)
    throw new Error("You must set DATABASE_URL in your .env");
};
