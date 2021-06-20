import React, { useContext, useEffect } from "react";
import { UserContext } from "lib/common/useUser";
import { useRouter } from "next/router";
import { useMeQuery } from "@capsule/client-gql";
import { isClient } from "lib/constants";

export const AuthData: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const { setUser } = useContext(UserContext);

  const { data, loading, error } = useMeQuery();

  useEffect(() => {
    if (asPath === "/login" || !isClient()) return;

    if (error) {
      localStorage.removeItem("token");
      return setUser({ isLoading: false, authed: false });
    }

    let user = data && data.me;
    setUser({ ...user, isLoading: loading, authed: true });
  }, [data, error, asPath]);

  return <>{children}</>;
};
