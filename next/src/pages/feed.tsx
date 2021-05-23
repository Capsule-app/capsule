import React from "react";
import { useQuery } from "@apollo/client";
import { postsQuery } from "lib/graphql/posts";
import { Post as PostType } from "util/types/post";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/Header";
import { Post } from "components/post/Post";

const FeedPage: React.FC = () => {
  const { data, loading } = useQuery(postsQuery);

  if (loading) return <div>loading</div>;

  return (
    <Wrapper title="Your Feed | Capsule">
      <Header />
      <div className="mt-2 m:mt-0 space-y-3">
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
