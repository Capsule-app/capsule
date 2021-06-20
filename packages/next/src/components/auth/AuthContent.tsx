import React, { useContext } from "react";
import { UserContext } from "lib/common/useUser";

export const AuthContent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(UserContext);

  if (!user || user.isLoading || !user.authed) return null;
  return <>{children}</>;
};
