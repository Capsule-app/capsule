import React from "react";
import { postQuery } from "lib/gql/post";
import { Wrapper } from "components/common/Wrapper";
import { Header } from "components/layouts/Header";
import { Post } from "components/post/Post";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const PostPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useQuery(postQuery, { variables: { id } });

  if (!data || loading) return null;

  const { post } = data;

  return (
    <Wrapper title={`${post.author.name}'s post | Capsule`}>
      <Header />
      <div className="mt-2 m:mt-0 pb-5 space-y-3">
        <Post post={post} />
        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comment: any, i: number) => (
            <div className="flex space-x-3">
              <div className="flex-none flex flex-col items-center space-y-1">
                <img
                  src={
                    comment.author.photo
                      ? comment.author.photo.url
                      : "/default-profile.png"
                  }
                  alt=""
                  className="w-6.5 h-6.5 rounded-full flex-none select-none"
                />
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};

export default PostPage;
