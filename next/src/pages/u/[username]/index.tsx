import React from "react";
import { Wrapper } from "components/common/Wrapper";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { userQuery } from "lib/graphql/user";

const UserPage: React.FC = () => {
  const { query } = useRouter();
  const { data, loading } = useQuery(userQuery, {
    variables: { username: query.username },
  });

  if (loading) return <div>loading...</div>;

  const user = data.userByUsername;

  return (
    <Wrapper title={`${user.name} (@${user.username}) | Capsule`}>
      <ul>
        <li>id: {user.id}</li>
        <li>name: {user.name}</li>
        <li>username: {user.username}</li>
      </ul>
    </Wrapper>
  );
};

export default UserPage;
