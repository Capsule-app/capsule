import React, { useContext } from "react";
import { Wrapper } from "components/feed/Wrapper";
import { UserContext } from "shared-hooks/useUser";
import { Header } from "modules/layouts/Header";
import { Post } from "modules/feed/Post";
import { useQuery } from "@apollo/client";
import { postsQuery } from "lib/graphql/posts";

const FeedPage: React.FC = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const { data, loading } = useQuery(postsQuery);

  if (loading) return <div>loading</div>;

  return (
    <Wrapper>
      <Header />
      <div className="mt-2 m:mt-0 space-y-3">
        {data &&
          data.posts.length > 0 &&
          data.posts.map((post: any) => <Post post={post} key={post.id} />)}
      </div>
    </Wrapper>
  );
};

export default FeedPage;
