import React from "react";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/SpaceHeader";
import { spaceQuery } from "lib/gql/space";
import { Post } from "components/post/Post";
import { Post as PostType } from "util/types/post";
import { GetServerSideProps } from "next";
import { initializeApollo } from "lib/apollo";
import { OpenGraph } from "components/common/OpenGraph";

const SpacePage: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return <div>loading</div>;

  const space = data.spaceByName;

  return (
    <Wrapper>
      <OpenGraph
        title={`${space.name} - Capsule`}
        description={space.description || "This space has no description."}
        image={space.avatarUrl}
      />
      <Header space={space} />
      <div>
        <div className="flex flex-col justify-center items-center w-full space-y-1 mt-2 m:mt-0">
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { name } = params as any;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: spaceQuery,
    variables: { name },
  });

  return {
    props: {
      data: data,
    },
  };
};

export default SpacePage;
