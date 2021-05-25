export const hasSession = async ({ context }, next) => {
  console.log(context.req.session.userId);
  if (!context.req.session.userId) throw new Error("No session");
  return next();
};
