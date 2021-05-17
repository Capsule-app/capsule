import React from "react";
import { useRouter } from "next/router";

export const UserPageController: React.FC = () => {
  const router = useRouter();

  return <p>hello {router.query.username}</p>;
};
