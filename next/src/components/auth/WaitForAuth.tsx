import React from "react";
import { useVerifyLoggedIn } from "../../util/hooks/useVerifyLogin";

interface WaitForAuthProps {}

export const WaitForAuth: React.FC<WaitForAuthProps> = ({ children }) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};
