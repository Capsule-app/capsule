import React from "react";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/Header";
import { Post } from "components/post/Post";
import { usePostsQuery, Post as PostType } from "@capsule/client-gql";

const FeedPage: React.FC = () => {
  const { data, loading } = usePostsQuery();

  if (!data || loading) return null;

  return (
    <Wrapper title="Your Feed | Capsule">
      <Header />
      <div className="mt-2 m:mt-0 pb-5 space-y-3">
        {data &&
          data.posts.length > 0 &&
          data.posts.map((post: PostType) => (
            <Post post={post} key={post.id} />
          ))}
      </div>
    </Wrapper>
  );
};

export default FeedPage;
