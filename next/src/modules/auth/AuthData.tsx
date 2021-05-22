import React, { useContext, useEffect } from "react";
import { UserContext } from "lib/common/useUser";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { meQuery } from "lib/graphql/me";

export const AuthData: React.FC = ({ children }) => {
  const { asPath } = useRouter();
  const cur = useContext(UserContext);

  const { data, loading } = useQuery(meQuery);

  useEffect(() => {
    if (asPath === "/") return;

    // fetch("http://localhost:4000/refresh", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(async (res) => {
    //   const data = await res.json();
    //   localStorage.setItem("uid", data.accessToken);
    // });

    let user = data && data.me;
    cur.setUser({ ...user, isLoading: loading });
  }, [data]);

  return <>{children}</>;
};
