import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "util/hooks/useTokenStore";
import { LoginPage } from "components/auth/LoginPage";
import { isClient } from "lib/constants";

const Home: React.FC = () => {
  const hasTokens = useTokenStore((s) => !!s.accessToken);
  const { push, query } = useRouter();

  useEffect(() => {
    if (isClient() && hasTokens) push(query.next ? query.next.toString() : "/");
  }, [hasTokens, push]);

  return <LoginPage />;
};

export default Home;
