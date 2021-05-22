import React, { useContext } from "react";
import { UserContext } from "lib/common/useUser";
import { useQuery } from "@apollo/client";
import { postsQuery } from "lib/graphql/posts";
import { Post as PostType } from "util/types/post";
import { Wrapper } from "components/feed/Wrapper";
import { Header } from "modules/layouts/Header";
import { Post } from "components/post/Post";

const FeedPage: React.FC = () => {
  const { user } = useContext(UserContext);
  const { data, loading } = useQuery(postsQuery);

  if (loading) return <div>loading</div>;

  return (
    <Wrapper>
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
