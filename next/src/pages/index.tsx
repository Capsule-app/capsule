import React from "react";
import { postsQuery } from "lib/gql/posts";
import { Post as PostType } from "util/types/post";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/Header";
import { Post } from "components/post/Post";
import { useQuery } from "@apollo/client";

const FeedPage: React.FC = () => {
  const { data, loading } = useQuery(postsQuery);

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
