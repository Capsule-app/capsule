import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isClient } from "lib/constants";

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://capsule.app/api/"
      : "http://localhost:4000/graphql/",
});

const authLink = setContext((_, { headers }) => {
  if (!isClient()) return { headers: {} };
  const token = localStorage?.getItem("uid");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
});
