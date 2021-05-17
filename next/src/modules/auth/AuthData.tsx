import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../shared-hooks/useUser";
import axios from "axios";
import { useRouter } from "next/router";

interface Props {}

export const AuthData: React.FC<Props> = ({ children }) => {
  const { asPath } = useRouter();
  const cur = useContext(UserContext);

  const { data, status } = useQuery("auth", async () => {
    const headers = { authToken: localStorage.getItem("token") };
    return await axios
      .get(`${process.env.API_URL}auth/`, {
        headers: headers,
      })
      .then((res) => res.data);
  });

  useEffect(() => {
    if (asPath === "/") return;
    cur.setUser({ ...data, isLoading: status === "loading" });
  }, [data]);

  return <>{children}</>;
};
