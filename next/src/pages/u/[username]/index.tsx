import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { userQuery } from "lib/graphql/user";
import { Wrapper } from "components/user/Wrapper";

const UserPage: React.FC = () => {
  const router = useRouter();
  const { data, loading } = useQuery(userQuery, {
    variables: { username: router.query.username },
  });

  if (loading) return <div>loading...</div>;

  const user = data.userByUsername;

  return (
    <Wrapper>
      <Head>
        <title>{`${user.name} (@${user.username}) | Capsule`}</title>
      </Head>
      <ul>
        <li>id: {user.id}</li>
        <li>name: {user.name}</li>
        <li>username: {user.username}</li>
      </ul>
    </Wrapper>
  );
};

export default UserPage;
