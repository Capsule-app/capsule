import React from "react";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/SpaceHeader";
import { userQuery } from "lib/gql/user";
import { Post } from "components/post/Post";
import { Post as PostType } from "util/types/post";
import { OpenGraph } from "components/common/OpenGraph";
import millify from "millify";
import { initializeApollo } from "lib/apollo";
import { GetServerSideProps } from "next";

const UserPage: React.FC<{ data: any }> = ({ data }) => {
  if (!data) return null;

  const user = data.userByUsername;

  return (
    <Wrapper>
      <OpenGraph
        title={`${user.name} (@${user.username}) - Capsule`}
        description={user.bio || "No bio yet."}
        image={user.avatarUrl}
      />
      <Header space={user} />
      <div className="mt-2 space-y-4">
        <div className="flex space-x-5 font-serif">
          <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-full" />
          <div className="w-full">
            <p className="text-2xl font-bold">{user.username}</p>
            <p className="text-lg -mt-1">{user.name}</p>
            {0 ? (
              <button className="mt-2 min-w-200 py-1 rounded-full bg-primary-200 text-black font-bold">
                Unfollow
              </button>
            ) : (
              <button className="mt-2 min-w-200 py-1 rounded-full bg-blue text-white font-bold">
                Follow
              </button>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <p className="font-extrabold font-serif">{user.posts.length}</p>
            <p>post{user.posts.length > 1 ? "s" : ""}</p>
            <span></span>
            <p className="font-extrabold font-serif">{millify(2500)}</p>
            <p>follower{user.posts.length > 1 ? "s" : ""}</p>
            <span></span>
            <p className="font-extrabold font-serif">{millify(100)}</p>
            <p>following</p>
          </div>
          <p>{user.bio || "No bio yet."}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {user.posts &&
          user.posts.map((post: PostType) => (
            <Post post={{ ...post, author: user }} key={post.id} />
          ))}
      </div>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { username } = params as any;

  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: userQuery,
    variables: { username },
  });

  return {
    props: {
      data: data,
    },
  };
};

export default UserPage;
