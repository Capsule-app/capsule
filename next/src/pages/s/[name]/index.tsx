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
      <Header space={space} />
      <div>
        <div className="flex flex-col justify-center items-center w-full space-y-1">
          <img src={space.avatarUrl} alt="" className="w-7 h-7 rounded-full" />
          <h3 className="text-3xl font-serif">{space.name}</h3>
          <p className="text-center text-primary-400">
            {space.description || "This space has no description."}
          </p>
          <div className="flex items-center space-x-1">
            <p className="font-extrabold font-serif">{space.members.length}</p>
            <p>member{space.members.length > 1 ? "s" : ""}</p>
            <p className="text-sm">•</p>
            <p className="font-extrabold font-serif">{space.posts.length}</p>
            <p>post{space.posts.length > 1 ? "s" : ""}</p>
          </div>
          <button className="max-w-md w-full bg-blue rounded-full text-white font-serif font-bold py-1">
            Join Space
          </button>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {space.posts &&
          space.posts.map((post: PostType) => (
            <Post post={post} key={post.id} />
          ))}
      </div>
    </Wrapper>
  );
};

export default SpacePage;
