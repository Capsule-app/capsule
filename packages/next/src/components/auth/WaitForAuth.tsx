import React from "react";
import { useVerifyLoggedIn } from "util/hooks/useVerifyLogin";

export const WaitForAuth: React.FC = ({ children }) => {
  if (!useVerifyLoggedIn()) {
    return null;
  }

  return <>{children}</>;
};
