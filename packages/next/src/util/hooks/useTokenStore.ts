import create from "zustand";
import { combine } from "zustand/middleware";
import { isClient } from "lib/constants";

const accessTokenKey = "token";
const refreshTokenKey = "refresh-token";

const getDefaultValues = () => {
  if (isClient()) {
    try {
      return {
        accessToken: localStorage.getItem(accessTokenKey) || "",
        refreshToken: localStorage.getItem(refreshTokenKey) || "",
      };
    } catch {}
  }

  return {
    accessToken: "",
    refreshToken: "",
  };
};

export const useTokenStore = create(
  combine(getDefaultValues(), (set) => ({
    setTokens: (x: { accessToken: string; refreshToken: string }) => {
      try {
        localStorage.setItem(accessTokenKey, x.accessToken);
        localStorage.setItem(refreshTokenKey, x.refreshToken);
      } catch {}

      set(x);
    },
  }))
);
