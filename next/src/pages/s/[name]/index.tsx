import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/SpaceHeader";
import { useQuery } from "@apollo/client";
import { spaceQuery } from "lib/graphql/space";

const SpacePage: React.FC = () => {
  const { query } = useRouter();
  const { data, loading } = useQuery(spaceQuery, {
    variables: { name: query.name },
  });

  if (loading || !data) return <div>loading</div>;

  return (
    <Wrapper title={`${data.spaceByName.name} / Capsule`}>
      <Header space={`${data.spaceByName.name}`} />
      {JSON.stringify(data.spaceByName)}
      <p>this is the space page {query.name}</p>
    </Wrapper>
  );
};

export default SpacePage;
