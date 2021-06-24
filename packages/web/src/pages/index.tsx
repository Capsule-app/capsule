import React from "react";
import { Search } from "react-ionicons";
import { usePostsQuery, Post as PostType } from "@capsule/client-gql";
import { Navigation, Widgets, Post } from "components";

const HomePage: React.FC = () => {
  const { data, loading } = usePostsQuery();
  if (!data || loading) return null;

  const { posts } = data;

  return (
    <div className="flex w-full max-w-1350 mx-auto">
      <Navigation />
      <div className="w-full p-8 overflow-auto">
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl font-bold">What&apos;s going on?</p>
          <Search width="32px" height="32px" />
        </div>
        {posts && (
          <div className="mt-6 space-y-4">
            {posts.length > 0 &&
              posts.map((post: PostType, idx: number) => (
                <Post key={post.id} post={post} idx={idx} />
              ))}
          </div>
        )}
      </div>
      <Widgets />
    </div>
  );
};

export default HomePage;
