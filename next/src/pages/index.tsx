import React from "react";
import { postsQuery } from "lib/graphql/posts";
import { Post as PostType } from "util/types/post";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/Header";
import { Post } from "components/post/Post";
import { GetServerSideProps } from "next";
import { initializeApollo } from "lib/apollo";

const FeedPage: React.FC<{ data: any }> = ({ data }) => {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: postsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data,
    },
  };
};

export default FeedPage;
