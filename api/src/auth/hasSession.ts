export const hasSession = async ({ context }, next) => {
  if (!context.req.session.userId) throw new Error("No session");
  return next();
};
