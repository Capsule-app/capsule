import React from "react";
import { AddCircle as Image } from "react-ionicons";
import { usePostsQuery, Post as PostType } from "@capsule/client-gql";
import { Groups, Channels, Widgets, NewPost as Post } from "components";

export default function HomePage(): React.ReactNode {
  const { data, loading } = usePostsQuery();
  if (!data || loading) return null;

  const { posts } = data;

  return (
    <div className="flex w-full max-w-1350 mx-auto bg-theme-700">
      <Groups />
      <Channels />
      <div className="w-full overflow-auto relative">
        {posts && (
          <div className="mx-4 my-4 space-y-4">
            {posts.length > 0 &&
              posts.map((post: PostType, idx: number) => (
                <Post key={post.id} post={post} idx={idx} />
              ))}
          </div>
        )}
        <div className="pl-4 pr-1 pb-4 sticky left-0 bottom-0 bg-theme-700 w-full z-20 space-y-3">
          <div className="left-4 top-0 absolute w-6 h-6 rounded-lg bg-gray-500"></div>
          <div className="ml-6.5 px-3 bg-theme-input h-6 rounded-lg flex flex-row items-center">
            <Image color="#6f84d3" />
            <input
              className="ml-3 w-full placeholder-gray-400 text-white bg-theme-input focus:outline-none"
              placeholder="Message #stream"
            />
          </div>
        </div>
        {/* <div className="pl-4 pr-1 pb-4 sticky left-0 bottom-0 bg-theme-700 w-full z-20 space-y-3">
          <div className="left-4 top-0 absolute w-6 h-6 rounded-lg bg-gray-500"></div>
          <div className="ml-6.5 px-3 bg-theme-input h-6 rounded-lg flex flex-row items-center">
            <Image color="#6f84d3" />
            <input
              className="ml-3 w-full placeholder-gray-400 text-white bg-theme-input focus:outline-none"
              placeholder="Message #stream"
            />
          </div>
        </div> */}
      </div>
      <Widgets />
    </div>
  );
}
