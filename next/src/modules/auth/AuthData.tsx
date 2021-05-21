import React, { useContext, useEffect } from "react";
import { UserContext } from "shared-hooks/useUser";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { meQuery } from "lib/graphql/me";

export const AuthData: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const cur = useContext(UserContext);

  const { data, loading } = useQuery(meQuery);

  useEffect(() => {
    if (asPath === "/") return;
    let user = data && data.me;
    cur.setUser({ ...user, isLoading: loading });
  }, [data]);

  return <>{children}</>;
};
