import React, { useContext } from "react";
import { UserContext } from "lib/common/useUser";

export const UnauthedContent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(UserContext);

  if (user && user.authed) return null;
  return <>{children}</>;
};
