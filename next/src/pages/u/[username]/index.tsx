import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/SpaceHeader";
import { useQuery } from "@apollo/client";
import { userQuery } from "lib/gql/user";
import { Post } from "components/post/Post";
import { Post as PostType } from "util/types/post";
import { OpenGraph } from "components/common/OpenGraph";
import Link from "next/link";
import Head from "next/head";
import millify from "millify";

const UserPage: React.FC = () => {
  const { query } = useRouter();
  const { data } = useQuery(userQuery, {
    variables: { username: query.username },
  });

  if (!data) return <div>loading...</div>;

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
          <Link href={`/u/${user.username}`}>
            <a className="flex-none">
              <img
                src={user.avatarUrl}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </a>
          </Link>
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
            <p className="text-sm">•</p>
            <p>Joined</p>
            <p className="font-bold font-serif">July 2017</p>
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

export default UserPage;
