import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "util/hooks/useTokenStore";

export const useVerifyLoggedIn = () => {
  const { replace, asPath } = useRouter();
  const hasTokens = useTokenStore((s) => !!s.accessToken);

  useEffect(() => {
    if (!hasTokens) {
      replace(`/login/?next=${asPath}`);
    }
  }, [hasTokens, asPath, replace]);

  return hasTokens;
};
