import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/SpaceHeader";
import { useQuery } from "@apollo/client";
import { spaceQuery } from "lib/graphql/space";
import { Post } from "components/post/Post";
import { Post as PostType } from "util/types/post";

const SpacePage: React.FC = () => {
  const { query } = useRouter();
  const { data, loading } = useQuery(spaceQuery, {
    variables: { name: query.name },
  });

  if (loading || !data) return <div>loading</div>;

  const space = data.spaceByName;

  return (
    <Wrapper title={`${space.name} / Capsule`}>
      <Header space={`${space.name}`} />
      <div className="mt-2 m:mt-0 space-y-3">
        {space.posts &&
          space.posts.map((post: PostType) => (
            <Post post={post} key={post.id} />
          ))}
      </div>
    </Wrapper>
  );
};

export default SpacePage;
